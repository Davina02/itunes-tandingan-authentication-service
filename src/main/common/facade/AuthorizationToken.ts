import Config from "../../config/Config";
import jwt from 'jsonwebtoken';
import AuthKeyRepositoryImpl from "../../repository/impl/AuthKeyRepositoryImpl";
import User from "../../model/entity/uma.user";

export class AuthorizationToken {
  /**
   * @static
   * @var string EXPIRATION_TIME
   * 
   * This value contains expiration time setting 
   * for Token Expiration.
   * This current value means 30 days
   * 
   * @link https://github.com/auth0/node-jsonwebtoken#readme
   */
  static EXPIRATION_TIME: string = "30d";

  public async generateAccessToken(user: User): Promise<string | null> {
    const jwt_token: string = jwt.sign(
      user.toJSON(), 
      Config.jwt.secret_key, 
      {
        expiresIn: AuthorizationToken.EXPIRATION_TIME
      }
    );

    /**
     * Invalidate Token
     */
    await AuthKeyRepositoryImpl.invalidateToken(user.id!);

    /**
     * Update Token
     */
    const token = await AuthKeyRepositoryImpl.updateToken({
      user_id: user.id!,
      private_key: jwt_token,
      expired_at: new Date(new Date().setDate(new Date().getDate() + 30))
    })

    return token!.public_key;
  }

  /**
   * Get current user with requested token
   */
  public async getMe(token: string): Promise<any> {

    const valid: any = await this.validateToken(token);

    let valid_token: string | boolean = "";

    if(valid == false) return false;
    else {
      valid_token = this.validateBearerPrefix(token);
    }

    const decrypted = await this.getRealToken(valid_token.toString());

    /**
     * Decoding JWT
     */
    return jwt.verify(
      decrypted,
      Config.jwt.secret_key
    );
  }

  /**
   * Check token validity
   */
  public async validateToken(token: string): Promise<boolean> {

    try{
      /**
       * Check if token had Bearer prefix 
       */
      const valid_token: any = this.validateBearerPrefix(token);

      if(valid_token === false) throw 'false';

      /**
       * Check the if the token is expired or not.
       */
      const decrypted_token: string = await this.getRealToken(valid_token);


      /**
       * Verify if the saved token is valid or not.
       */
      const verified = jwt.verify(decrypted_token, Config.jwt.secret_key);

      if(!verified) throw 'false';

      return true;
      
    }catch (error) {
      return false;
    }
  }

  /**
   * validateBearerPrefix
   *    A function that seperate "Bearer " from " {token}"
   * 
   * @param string "token with Bearer in prefix"
   * 
   * @return bool false if the Bearer is not exist
   * @return string token if Bearer exists
   */
  private validateBearerPrefix(token: string): boolean | string {
    
    const bearer: Array<string> = token.split(" ");

    return (bearer[0] !== "Bearer") ? false : bearer[1];
  }

  /**
   * getRealToken
   * 
   * @param string uuid
   *    Reference to uuid_token in uma_tbl_jwt_token
   * 
   * @return string jwt_token
   */
  private async getRealToken(uuid: string): Promise<string> {
    const jwtToken = await AuthKeyRepositoryImpl.checkTokenValidity(uuid);

    if(jwtToken == null){

      throw 'false';

    }

    return jwtToken!.private_key!;
  }

  public async invalidateTokenByUserId(user_id: number): Promise<void> {

    await AuthKeyRepositoryImpl.invalidateToken(user_id);

  }

}