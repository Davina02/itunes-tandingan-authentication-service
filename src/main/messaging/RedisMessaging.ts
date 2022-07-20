import config from '../config/Config';
import redis, { Redis } from 'ioredis';

export interface MessagingConstructorInterface {
  port: number;
  host: string;
  family: number;
  password: string | undefined;
  db: number;
}

/**
 * Messaging
 * 
 * This class contain Redis Instance initializer
 * for any function that might use Redis as
 * Message Broker.
 */
export abstract class RedisMessaging {

  protected instance: Redis = new redis();

  /**
   * getRedisInstance
   * 
   * A function to get a new Redis Instance
   * 
   * @param redisConfiguration
   * 
   * @return Redis
   * 
   * @see MessagingConstructorInterface
   */ 
  public getRedisInstance = (
    redisConfiguration: 
      MessagingConstructorInterface 
      | null = null
  ): Redis => {
    
    /**
     * Set default configuration of Redis Setting.
     * 
     * @see config
     */
    const usedConfiguration: MessagingConstructorInterface = config.redis;

    /**
     * If redisConfiguration is not null,
     * set the custom config.
     */
    if(redisConfiguration != null){
      usedConfiguration.port = redisConfiguration.port;
      usedConfiguration.host = redisConfiguration.host;
      usedConfiguration.family = redisConfiguration.family;
      usedConfiguration.password = redisConfiguration.password;
      usedConfiguration.db = redisConfiguration.db;
    }

    this.instance = new redis({
        port: usedConfiguration.port,
        host: usedConfiguration.host,
        family: usedConfiguration.family,
        db: usedConfiguration.db,
        password: usedConfiguration.password,
    });

    return this.instance;
  }

}