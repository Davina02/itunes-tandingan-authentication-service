import { GenerateCaptchaResponseDTO } from "../../model/dto/response/generate-captcha-response-dto";

export class CaptchaGenerator {

  /**
   * generate
   *
   * A function to generate Captcha.
   *
   */
  public static generate = async(): Promise<GenerateCaptchaResponseDTO> => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let captcha: string = "";

    for(let i = 0; i < 5; i++){
      captcha+= characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const result = new GenerateCaptchaResponseDTO();
    result.captcha = captcha;

    return result;
  }

}

