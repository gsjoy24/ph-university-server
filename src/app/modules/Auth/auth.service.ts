import { TLoginUser } from "./auth.interface";

const loginUser = (payload: TLoginUser) => {

   const { id, password } = payload;
   
   
}

export const AuthServices = {
   loginUser
}