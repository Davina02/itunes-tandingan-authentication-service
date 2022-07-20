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

}