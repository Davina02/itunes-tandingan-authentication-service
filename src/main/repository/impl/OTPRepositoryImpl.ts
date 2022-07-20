
import { Op } from "sequelize/types";
import { InvalidOTPException } from "../../common/exception/InvalidOTPException";
import { OTPGenerator } from "../../common/facade/OTPGenerator";
import OTP from "../../model/entity/uma.otp";
import { OTPRepository } from "../OTPRepository";
import UserRepositoryImpl from "./UserRepositoryImpl";

class OTPRepositoryImpl implements OTPRepository {

  createOTP = async (user_id: number, phone: string): Promise<OTP> => 
    OTP.create({
        user_id: user_id,
        phone: phone,
        code: await OTPGenerator.generate(),
        expired_at: new Date(new Date().setDate(new Date().getMinutes() + 5))
    });

  checkSameUnexpiredOTP = async (otp: string): Promise<OTP | null> => 
    OTP.findOne({
        where: {
            otp: otp,
            expired_at: {
                [Op.gt]: new Date()
            }
        }
    });

  validateOTP = async (phone: string, otp: string): Promise<OTP> => {
    const dataOtp = await this.checkSameUnexpiredOTP(otp);

    if(dataOtp === null) {
        await UserRepositoryImpl.wrongOTPPunisher(dataOtp!.user_id);
        throw new InvalidOTPException();
    }

    const userCredential = await UserRepositoryImpl.findUserByPhoneNoNull(phone);

    /**
     * If phone not match with the correspond User ID, throw an exception.
     */
    if(userCredential.id != dataOtp.user_id){
        await UserRepositoryImpl.wrongOTPPunisher(dataOtp!.user_id);
        throw new InvalidOTPException();
    }
  
    return dataOtp;
  }

}

export default new OTPRepositoryImpl();