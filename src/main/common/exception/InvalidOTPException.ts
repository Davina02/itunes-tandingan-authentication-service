import {ErrorHandler} from '../../config/Exception';

export class InvalidOTPException extends ErrorHandler {

  constructor() {
    super(
      "UMA0003",
      "Kode OTP yang dimasukan tidak valid."
    );
  }

}
