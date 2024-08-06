import { changeRole } from "../../database/mongo/repostories/changeRole";

export default async(
    id:string
)=>{
    try {
        console.log(id,'this is user role want change');
        
        await changeRole(id)
    } catch (error) {
        console.log('change role consumer error:',error)
    }
}