import { controllers } from "../../presentation/controllers";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { Router } from 'express'
import { jwtMiddleware } from "../../_lib/http/middleWares/jwtMiddleware";

export const router = (dependencies: IDependencies) => {
    const {
        signup, login, getUser, logout, googleAuth, updateProfile,forgotPassword,updatePassword,getAllUserData,getUsersByEmail,getUserByEmail
    } = controllers(dependencies)
    const router = Router()

    router.route('/')
        .get(jwtMiddleware, getUser)

    router.route('/getAllUser')
        .get(getAllUserData)

    router.route("/signup")
        .post(signup);

    router.route("/login")
        .post(login)

    router.route("/logout")
        .delete(logout)

    router.route("/googleSignup")
        .post(googleAuth)

    router.route('/updateProfile')
        .put(updateProfile)


    router.route("/changePassword")
        .put(updatePassword)

    router.route("/forgotPassword")
        .post(forgotPassword)

    router.route("/getUsers")
            .post(getUsersByEmail)
    
    
    router.route('/findUser/:email')
            .get(getUserByEmail)

    return router;

}