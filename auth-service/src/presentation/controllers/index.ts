import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupController } from "./signup";
import { loginController } from "./login";
import { getUserController } from "./getUser";
import { logoutController } from "./logout";
import { googleAuthController } from "./googleAuth";
import { updateProfileController } from "./updateProfile";
import { forgotPassword } from "./forgotPassword";
import {  updatePasswordController } from "./updatePassword";
import { getAllUserController } from "./getAllUser";

export const controllers=(dependancie:IDependencies)=>{
    return{
        signup:signupController(dependancie),
        login:loginController(dependancie),
        getUser:getUserController(dependancie),
        logout:logoutController(dependancie),
        googleAuth:googleAuthController(dependancie),
        updatePassword:updatePasswordController(dependancie),
        updateProfile:updateProfileController(dependancie),
        forgotPassword:forgotPassword(dependancie),
        getAllUserData:getAllUserController(dependancie)
    }
}
