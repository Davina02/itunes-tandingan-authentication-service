import OTP from "../model/entity/uma.otp";

export interface OTPRepository {

  /**
   * createOTP
   * 
   * A repository to create OTP.
   * 
   */
  createOTP(user_id: number, phone: string): Promise<OTP>;
  
  /**
   * checkSameUnexpiredOTP
   * 
   * Check wherever the active OTP is already exists.
   * 
   * @param otp
   */
  checkSameUnexpiredOTP(otp: string): Promise<OTP | null>;

  /**
   * validateOTP
   *
   * A function to validate OTP by phone and otp.
   *
   * @param phone
   * @param otp
   */
   validateOTP(phone: string, otp: string): Promise<OTP>;

  /**
   * invalidateOTP
   * A repository that invalidate otp with 
   * requested user_id. 
   * 
   * @param number user_id
   *    Reference to user_id in uma_tbl_users
   *
   */
   invalidateOTP(user_id: number): Promise<void>;

}