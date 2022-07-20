import OTPRepositoryImpl from "../../repository/impl/OTPRepositoryImpl";


export class OTPGenerator {

  /**
   * generate
   *
   * A function to generate OTP code.
   *
   */
  public static generate = async(): Promise<string> => {
    let otp: string = "";

    for(let i = 0; i < 6; i++){
      otp+= `${Math.floor(Math.random() * 10)}`;
    }

    const found = await OTPRepositoryImpl.checkSameUnexpiredOTP(otp);

    return found === null ? otp : OTPGenerator.generate();
  }

}

