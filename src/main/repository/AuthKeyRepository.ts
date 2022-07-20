import { RegisterAuthKeyDTO } from "../model/dto/request/RegisterAuthKeyDTO";
import AuthKey from "../model/entity/uma.auth-key";


export interface AuthKeyRepository {
  
  /**
   * checkSameUnexpiredPrivateKey
   * 
   * Check wherever the active private_key is already exists.
   * 
   * @param private_key
   */
   checkSameUnexpiredPrivateKey(private_key: string): Promise<AuthKey | null>;

   /**
   * registerToken
   * 
   * A repository that register the Auth Key to database.
   * 
   */
   registerToken(dto: RegisterAuthKeyDTO): Promise<AuthKey>;

   /**
   * updateToken
   *  A repository to update AuthKey data.
   *
   * @return AuthKey
   *  Return null if user with requested id not exist
   */
  updateToken(dto: RegisterAuthKeyDTO): Promise<AuthKey | null>;

  /**
   * invalidateToken
   * A repository that invalidate a token with 
   * requested user_id. 
   * 
   * @param string user_id
   *    Reference to user_id in uma_tbl_users
   *
   */
   invalidateToken(user_id: number): Promise<void>;

  /**
   * checkTokenValidity
   * A repository to find a not expired token by token string.
   * 
   */
   checkTokenValidity(token: string): Promise<AuthKey | null>;

}