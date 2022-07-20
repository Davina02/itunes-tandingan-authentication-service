import { UpdateUserDTO } from '../model/dto/request/UpdateUserDTO';
import User from '../model/entity/uma.user';

export interface UserRepository {

  /**
   * createUser
   *  A repository to create new User
   * 
   * @return User
   */
  createUser(name: string): Promise<User>;

  /**
   * findUserByPhone
   *  A repository to find user data by phone.
   * 
   * @param phone
   * 
   * @return User
   */
  findUserByPhone(phone: string): Promise<User | null>;

  /**
   * updateUser
   *  A repository to update user data.
   *
   * @return User
   *  Return null if user with requested id not exist
   */
  updateUser(dto: UpdateUserDTO): Promise<User | null>;
  
  /**
   * findUserById
   *  A repository to find user data by id.
   * 
   * @param number id
   * 
   * @return User
   *  Return null if user with requested id not exist
   */
  findUserById(id: number): Promise<User | null>;

  /**
   * findUserByPhoneNoNull
   *  A repository to find user data by phone.
   * 
   * @param phone
   * 
   * @return User
   */
  findUserByPhoneNoNull(phone: string): Promise<User>;

  /**
   * wrongOTPPunisher
   *  A repository to count, and punish (suspend) every wrong OTP event.
   * 
   * @param id
   *
   * @return void
   */
   wrongOTPPunisher(id: number): Promise<void>;

}