import { RedisMessaging } from "../RedisMessaging";
import { Redis } from 'ioredis';
import OTP from "../../model/entity/uma.otp";

/**
 * CreateOTPMessageProducer
 * 
 * A Producer class that had responsibility to 
 * send OTP to Redis
 * 
 * @extends RedisMessaging
 * @see RedisMessaging
 */
export class CreateOTPMessageProducer extends RedisMessaging {

  static CREATE_OTP_MESSAGE_PRODUCER_TOPIC = "CREATE_OTP_MESSAGE";
  
  constructor () {
    super();
    this.getRedisInstance();
  }

  public produce = (otp: OTP): void => {
    const instance: Redis = this.instance;

    instance.publish(
      CreateOTPMessageProducer.CREATE_OTP_MESSAGE_PRODUCER_TOPIC,
      JSON.stringify({
        "otp": otp.code
      })
    );

    console.log("Published OTP to Redis Server with user_id " + otp.user_id);
  }
}