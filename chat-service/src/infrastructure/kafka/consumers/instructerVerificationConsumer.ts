import { updateRole } from "@/infrastructure/database/mongo/repositories/updateUserRole";

export default async(
    id:string
)=>{
    try {
        console.log(id,'this is user role want change');
        
        await updateRole(id)
    } catch (error) {
        console.log('change role consumer error:',error)
    }
}