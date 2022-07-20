import { AuthorizationToken } from "../common/facade/AuthorizationToken";
import { CreateOTPMessageProducer } from "../messaging/producer/CreateOTPMessageProducer";
import User from "../model/entity/uma.user";
import AuthKeyRepositoryImpl from "../repository/impl/AuthKeyRepositoryImpl";
import OTPRepositoryImpl from "../repository/impl/OTPRepositoryImpl";
import UserRepositoryImpl from "../repository/impl/UserRepositoryImpl";


export class UserControllerHandler {

    public async createNewUser(name: string, signature_key: string) {

        /**
         * Check if user is already created
         */
        if (await AuthKeyRepositoryImpl.checkSameUnexpiredPrivateKey(signature_key) == null) {
            /**
             * Create user
             */
            const data: User = await UserRepositoryImpl.createUser(name);

            /**
             * Save signature_key
             */
            const dto = {
                user_id: parseInt(data.id!.toString()),
                private_key: signature_key,
                expired_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }

            await AuthKeyRepositoryImpl.registerToken(dto);
        }
        
    }

    public async registerUser(name: string, phone: string, signature_key: string) {

        /**
         * Check if phone is already occupied
         */
        if (await UserRepositoryImpl.findUserByPhone(phone) == null) {

            const data = await AuthKeyRepositoryImpl.checkSameUnexpiredPrivateKey(signature_key);

            /**
             * Register user
             */
            const dto = {
                user_id: data!.id!,
                name: name,
                phone: phone,
                status: User.ACTIVE,
                registered_at: new Date()
            }

            const user = await UserRepositoryImpl.updateUser(dto);

            const userData = await UserRepositoryImpl.findUserById(user!.id!);

            /**
             * Token Handshake
             */
            new AuthorizationToken().invalidateTokenByUserId(userData!.id!);
            const accessToken = await new AuthorizationToken().generateAccessToken(userData!);

            /**
             * Create OTP
             */
            const otp = await OTPRepositoryImpl.createOTP(userData!.id!, userData!.phone);

            /**
             * Publish OTP to Redis with key: CREATE_OTP_MESSAGE
             */
            new CreateOTPMessageProducer().produce(otp);
        }
        
    }
    
}