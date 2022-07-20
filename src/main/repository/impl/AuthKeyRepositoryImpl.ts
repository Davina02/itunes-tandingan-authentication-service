import { Op } from 'sequelize/types';
import { RegisterAuthKeyDTO } from '../../model/dto/request/RegisterAuthKeyDTO';
import AuthKey from '../../model/entity/uma.auth-key';
import { AuthKeyRepository } from '../AuthKeyRepository';
import { v4 } from 'uuid';
import { UserNotFoundException } from '../../common/exception/UserNotFoundException';

class AuthKeyRepositoryImpl implements AuthKeyRepository {

  checkSameUnexpiredPrivateKey = async (private_key: string): Promise<AuthKey | null> => 
    AuthKey.findOne({
        where: {
            private_key: private_key,
            expired_at: {
                [Op.gt]: new Date()
            }
        }
    });

  registerToken = async (dto: RegisterAuthKeyDTO): Promise<AuthKey> => 
    AuthKey.create({
        user_id: dto.user_id,
        private_key: dto.private_key,
        expired_at: dto.expired_at
    });

  updateToken = async (dto: RegisterAuthKeyDTO): Promise<AuthKey | null> => {
    const execution = await AuthKey.findOne({
        where: {
            user_id: dto.user_id
        }
    }).then(resultSet => resultSet);

    if(execution === null){
        throw new UserNotFoundException();
    }

    execution.private_key = dto.private_key;
    execution.public_key = v4();
    execution.expired_at = dto.expired_at;

    await execution.save();
    
    return execution;
  }

  invalidateToken = async (user_id: number): Promise<void> => {
    await AuthKey.update({
        expired_at: new Date()
      },{
        where: {
          user_id: user_id
        }
      }).then(res => res);
  }

  checkTokenValidity = async (token: string): Promise<AuthKey | null> => {
    return AuthKey.findOne({
      where: {
        public_key: token,
        expired_at: {
          [Op.gt]: new Date()
        }
      }
    }).then(resultSet => resultSet);
  }

}

export default new AuthKeyRepositoryImpl();