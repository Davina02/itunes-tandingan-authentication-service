import {ErrorHandler} from '../../config/Exception';

export class InvalidOTPException extends ErrorHandler {

  constructor() {
    super(
      "UMA0003",
      "Authentication failed. Please re-check your input."
    );
  }

}
