import { AuthControllerHandler } from "../main/handler/AuthControllerHandler";

async function main(): Promise<void> {
  const handler = new AuthControllerHandler();

//   try {
//     handler.authorizeUser("08123456789");
//     console.log("authorizeUser Function Passed");
//   } catch (error: any) {
//     console.log("authorizeUser Function Error: "+ error.message);
//   }  

  // try {
  //   handler.authenticateUser("0824505156", "905185");
  //   console.log("authenticateUser Function Passed");
  // } catch (error: any) {
  //   console.log("authenticateUser Function Error: "+ error.message);
  // }  

  // try {
  //   handler.logout("3a51b86d-c618-4cec-8b96-89bc2675fbec");
  //   console.log("logout Function Passed");
  // } catch (error: any) {
  //   console.log("logout Function Error: "+ error.message);
  // }  

  // try {
  //   handler.me("b936b70e-e237-47e7-9234-3d66c75dfbcc");
  //   console.log("me Function Passed");
  // } catch (error: any) {
  //   console.log("me Function Error: "+ error.message);
  // }  

}

export default main();