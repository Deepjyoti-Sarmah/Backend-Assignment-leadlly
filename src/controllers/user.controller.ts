import { asyncHandler } from "../utils/asyncHandler";
import { UserZod } from "../zod/user.zod";

const registerUser = asyncHandler( async( req, res) => {

  // const {username, fullname, email, password} = req.body;
  const username = UserZod.safeParse(req.body.username);
  const fullname = UserZod.safeParse(req.body.fullname);
  const email = UserZod.safeParse(req.body.email);
  const password = UserZod.safeParse(req.body.password);
  
  

});
