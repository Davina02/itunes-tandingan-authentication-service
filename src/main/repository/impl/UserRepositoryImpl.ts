import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { UserSuspendedException } from '../../common/validation/uma/UserSuspendedException';
import { UpdateUserDTO } from '../../model/dto/request/UpdateUserDTO';
import User from '../../model/entity/uma.user';
import { UserRepository } from '../UserRepository';

class UserRepositoryImpl implements UserRepository {

  createUser = async (name: string): Promise<User> => {
    return User.create({
      name: name
    });
  }
    

  findUserByPhone = async (phone: string): Promise<User | null> =>
    User.findOne({
      where: {
        phone: phone,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

  updateUser = async (dto: UpdateUserDTO): Promise<User | null> => {
    const execution = await User.findOne({
      where: {
        id: dto.user_id,
        is_deleted: 0
      }
    }).then(resultSet => resultSet);

    if(execution === null){
      throw new UserNotFoundException();
    }

    execution.name = dto.name;
    execution.phone = dto.phone;
    execution.status = dto.status;
    execution.registered_at = dto.registered_at;

    await execution.save();
    
    return execution;
  }

  findUserById = async (id: number): Promise<User | null> =>
    User.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      return resultSet;
    });

  findUserByPhoneNoNull = async (phone: string): Promise<User> =>
    User.findOne({
      where: {
        phone: phone,
        is_deleted: 0
      }
    }).then(resultSet => {
      if(resultSet === null){
        throw new UserNotFoundException();
      }
      return resultSet;
    });

  wrongOTPPunisher = async (id: number): Promise<void> => {
    const finds = await User.findOne({
      where: {
        id: id,
        is_deleted: 0
      }
    }).then(resultSet => {
      return resultSet;
    });

    if (finds === null) {
      throw new UserNotFoundException();
    }

    /**
     * Determine either increment it, or punish the user.
     * To make sure the punishment is applied to user that just
     * typed the wrong OTP, do decrement by 1.
     */
     if (finds.login_attempt === User.DEFAULT_WRONG_PASSWORD_PUNISHMENT - 1) {
      finds.status = User.SUSPENDED;
    } else {
      finds.login_attempt = finds.login_attempt + 1;
    }

    await finds.save();

    /**
     * If User is Suspended, immediately throw an Exception.
     */
    if(finds.status === User.SUSPENDED){
      throw new UserSuspendedException(finds.phone);
    }

  }
    
}

export default new UserRepositoryImpl();