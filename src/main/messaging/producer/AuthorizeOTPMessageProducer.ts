import { RedisMessaging } from "../RedisMessaging";
import { Redis } from 'ioredis';
import User from "../../model/entity/uma.user";

/**
 * AuthorizeOTPMessageProducer
 * 
 * A Producer class that had responsibility to 
 * send Phone to Redis
 * 
 * @extends RedisMessaging
 * @see RedisMessaging
 */
export class AuthorizeOTPMessageProducer extends RedisMessaging {

  static AUTHORIZE_OTP_MESSAGE_PRODUCER_TOPIC = "CREATE_OTP_MESSAGE";
  
  constructor () {
    super();
    this.getRedisInstance();
  }

  public produce = (user: User): void => {
    const instance: Redis = this.instance;

    instance.publish(
      AuthorizeOTPMessageProducer.AUTHORIZE_OTP_MESSAGE_PRODUCER_TOPIC,
      JSON.stringify({
        "phone": user.phone
      })
    );

    console.log("Published Phone to Redis Server with user_id " + user.id);
  }
}