import { Controller } from './Controller';
import express, { Request, Response } from 'express';
import { BaseResponse } from '../../model/dto/BaseResponse';
import { validationResult } from 'express-validator';
import RequestValidationException from '../../common/exception/RequestValidationException';
import CreateUserValidation from '../../common/validation/uma/CreateUserValidation';
import { UserControllerHandler } from '../../handler/UserControllerHandler';
import RegisterUserValidation from '../../common/validation/uma/RegisterUserValidation';

const app = express.Router();

class UserController extends Controller {

  public routes = (): express.Router => {

    /**
     * Create New User API 
     * 
     * This API will create unregistered user and save signature key.
     * 
     */
    app.post("/create-new-user", CreateUserValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        await (new UserControllerHandler().createNewUser(
            request.body.name,
            request.body.signature_key
        ))

        return BaseResponse.ok(
            null,
            "User is created",
            response,
            "UMA0001"
        );

    });

    /**
     * Register User API 
     * 
     * This API will register user and create OTP data.
     * 
     */
    app.post("/register-user", RegisterUserValidation, async (request: Request, response: Response) => {
        /**
         * Request Validator
         */
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new RequestValidationException(
                errors.array()
            );
        }

        await (new UserControllerHandler().registerUser(
            request.body.name,
            request.body.phone,
            request.body.signature_key
        ))

        return BaseResponse.ok(
            null,
            "User is registered",
            response,
            "UMA0002"
        );

    });

    return app;
  }

}

export default new UserController().routes();
