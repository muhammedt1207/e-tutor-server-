import { createUser } from "@/infrastructure/database/mongo/repositories/createUser";

export default async(
    data:any
)=>{
    try {
        console.log(data,'this is user role want change......................');
        
        await createUser(data)
    } catch (error) {
        console.log('change role consumer error:',error)
    }
}