import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import AuthorizeUserValidation from '../../common/validation/auth/AuthorizeUserValidation';
import { AuthControllerHandler } from '../../handler/AuthControllerHandler';
import AuthenticateUserValidation from '../../common/validation/auth/AuthenticateUserValidation';
import { CaptchaGenerator } from '../../common/facade/CaptchaGenerator';

const app = express.Router();

class UserController extends Controller {

  public routes = (): express.Router => {

    /**
     * Authorize User API 
     * 
     * This API will authorize user to get the OTP from Mailer.
     * 
     */
    app.post("/authorize-user", AuthorizeUserValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        await (new AuthControllerHandler().authorizeUser(
            request.body.phone
        ))

        return BaseResponse.ok(
            null,
            "If the inputted phone is already registered, the OTP will be send. Please check your SMS.",
            response
        );

    });

    /**
     * Authenticate User API 
     * 
     * This API will authenticate user by inputting this credentioals:
     * - Phone
     * - OTP
     * 
     * If the credentials are right, return token.
     * 
     */
    app.post("/authenticate-user", AuthenticateUserValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        return BaseResponse.ok(
            await (new AuthControllerHandler().authenticateUser(
                request.body.phone,
                request.body.otp
            )),
            "User authenticated",
            response
        );

    });

    /**
     * Generate Captcha API 
     * 
     */
    app.post("/generate-captcha", async (request: Request, response: Response) => {

        return BaseResponse.ok(
            await CaptchaGenerator.generate(),
            "Captcha generated",
            response
        );

    });

    /**
     * Logout API
     *  An API to invalidate token by token.
     */
    app.post("/logout", async (request: Request, response: Response) => {

        await (new AuthControllerHandler().logout(request.headers.authorization!));

        return BaseResponse.ok(
            null,
            "User logged out",
            response
        );

    });

    /**
     * me API
     *  An API to get current decrypted JWT Token.
     */
    app.get("/me", async (request: Request, response: Response) => {

        const data = await (new AuthControllerHandler().me(request.headers.authorization!));

        return BaseResponse.ok(
            data,
            `Hi ${data.name}`,
            response
        );

    });

    return app;
  }
}

export default new UserController().routes();
