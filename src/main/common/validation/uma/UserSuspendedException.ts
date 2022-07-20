import { ErrorHandler } from '../../../config/Exception';

export class UserSuspendedException extends ErrorHandler {

  constructor(phone: string){
    super(
        "UMA0004",
        `Akun pengguna ${phone} ter-suspend. Silahkan ubah kata sandi anda.`
    );
  }

}
