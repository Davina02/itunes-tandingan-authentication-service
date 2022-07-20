import { UserControllerHandler } from "../main/handler/UserControllerHandler";

async function main(): Promise<void> {
  const handler = new UserControllerHandler();

  try {
    handler.createNewUser("Davina", "asdfghjkxcvbnmwertyui");
    console.log("createNewUser Function Passed");
  } catch (error: any) {
    console.log("createNewUser Function Error: "+ error.message);
  }  

  // try {
  //   handler.registerUser("Davina", "08123456789", "asdfghjkxcvbnmwertyui");
  //   console.log("registerUser Function Passed");
  // } catch (error: any) {
  //   console.log("registerUser Function Error: "+ error.message);
  // }  

}

export default main();