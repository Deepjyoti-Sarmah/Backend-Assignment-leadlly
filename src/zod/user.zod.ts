import {z} from "zod";

const UserZod = z.object({
  username: z.string(),
  fullname: z.string(),
  email: z.string(),
  password: z.string().min(8)
});

export { UserZod }
