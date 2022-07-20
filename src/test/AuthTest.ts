import { AuthControllerHandler } from "../main/handler/AuthControllerHandler";

async function main(): Promise<void> {
  const handler = new AuthControllerHandler();

  try {
    handler.authorizeUser("08123456789");
    console.log("authorizeUser Function Passed");
  } catch (error: any) {
    console.log("authorizeUser Function Error: "+ error.message);
  }  

  try {
    handler.authenticateUser("08123456789", "otp??");
    console.log("authenticateUser Function Passed");
  } catch (error: any) {
    console.log("authenticateUser Function Error: "+ error.message);
  }  

  try {
    handler.logout("token??");
    console.log("logout Function Passed");
  } catch (error: any) {
    console.log("logout Function Error: "+ error.message);
  }  

  try {
    handler.me("token??");
    console.log("me Function Passed");
  } catch (error: any) {
    console.log("me Function Error: "+ error.message);
  }  

}

export default main();