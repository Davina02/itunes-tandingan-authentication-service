
import { Op } from "sequelize";
import { InvalidOTPException } from "../../common/exception/InvalidOTPException";
import { OTPGenerator } from "../../common/facade/OTPGenerator";
import OTP from "../../model/entity/uma.otp";
import { OTPRepository } from "../OTPRepository";
import UserRepositoryImpl from "./UserRepositoryImpl";

class OTPRepositoryImpl implements OTPRepository {

  createOTP = async (user_id: number, phone: string): Promise<OTP> => {
    return OTP.create({
        "user_id": user_id,
        "phone": phone,
        "code": await OTPGenerator.generate(),
        "expired_at": new Date(new Date().setMinutes(new Date().getMinutes() + 5))
    });
  }
    

  checkSameUnexpiredOTP = async (otp: string): Promise<OTP | null> => 
    OTP.findOne({
        "where": {
            "code": otp,
            "expired_at": {
                [Op.gt]: new Date()
            }
        }
    });

  validateOTP = async (phone: string, otp: string): Promise<OTP> => {
    const userCredential = await UserRepositoryImpl.findUserByPhone(phone);

    if(userCredential === null) {     
      throw new InvalidOTPException();
    }

    const dataOtp = await this.checkSameUnexpiredOTP(otp);

    if(dataOtp === null) {   
        await UserRepositoryImpl.wrongOTPPunisher(userCredential.id!);  
        throw new InvalidOTPException();
    }

    /**
     * If phone not match with the correspond User ID, throw an exception.
     */
    if(userCredential.id != dataOtp.user_id){
        await UserRepositoryImpl.wrongOTPPunisher(dataOtp!.user_id);
        throw new InvalidOTPException();
    }
  
    return dataOtp;
  }

  invalidateOTP = async (user_id: number): Promise<void> => {
    await OTP.update({
        "expired_at": new Date()
      },{
        "where": {
          "user_id": user_id
        }
      }).then(res => res);
  }

}

export default new OTPRepositoryImpl();