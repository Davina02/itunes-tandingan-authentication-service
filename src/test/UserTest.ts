import { UserControllerHandler } from "../main/handler/UserControllerHandler";

async function main(): Promise<void> {
  const handler = new UserControllerHandler();

  // try {
  //   handler.createNewUser("Mark", "psdfijstgvujnikrdcg");
  //   console.log("createNewUser Function Passed");
  // } catch (error: any) {
  //   console.log("createNewUser Function Error: "+ error.message);
  // }  

  // try {
  //   handler.registerUser("Mark", "0824505156", "psdfijstgvujnikrdcg");
  //   console.log("registerUser Function Passed");
  // } catch (error: any) {
  //   console.log("registerUser Function Error: "+ error.message);
  // }  

}

export default main();