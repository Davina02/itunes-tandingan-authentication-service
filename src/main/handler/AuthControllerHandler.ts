import { AuthorizationToken } from "../common/facade/AuthorizationToken";
import { AuthorizeOTPMessageProducer } from "../messaging/producer/AuthorizeOTPMessageProducer";
import { AuthenticateUserResponseDTO } from "../model/dto/response/authenticate-user-response-dto";
import { GetMeResponseDTO } from "../model/dto/response/get-me-response-dto";
import User from "../model/entity/uma.user";
import AuthKeyRepositoryImpl from "../repository/impl/AuthKeyRepositoryImpl";
import OTPRepositoryImpl from "../repository/impl/OTPRepositoryImpl";
import UserRepositoryImpl from "../repository/impl/UserRepositoryImpl";


export class AuthControllerHandler {

    public async authorizeUser(phone: string) {

        /**
         * Check user existences by inputted phone
         */
        const user = await UserRepositoryImpl.findUserByPhone(phone);

        if (user != null && user.status === User.ACTIVE) {
            new AuthorizeOTPMessageProducer().produce(user);
        }
        
    }

    public async authenticateUser(phone: string, otp: string): Promise<AuthenticateUserResponseDTO> {

        /**
         * Check for code existence
         */
        const code = await OTPRepositoryImpl.validateOTP(phone, otp);

        const user: User | null = await UserRepositoryImpl.findUserById(code.user_id);

        /**
         * Token Handshake
         */
        new AuthorizationToken().invalidateTokenByUserId(user!.id!);
        const accessToken = await new AuthorizationToken().generateAccessToken(user!);

        const data = new AuthenticateUserResponseDTO();
        data.token = accessToken;

        return data;
        
    }

    public async logout(token: string) {

        const data = await new AuthorizationToken().getMe(token);

        await AuthKeyRepositoryImpl.invalidateToken(data.id);
        
    }

    public async me(token: string): Promise<GetMeResponseDTO> {
        const data = await new AuthorizationToken().getMe(token);

        const user = await UserRepositoryImpl.findUserById(data.id);

        const myData = new GetMeResponseDTO();
        myData.name = user!.name;
        myData.phone = user!.phone;
        myData.status = user!.user_status;

        return myData;
    }

}