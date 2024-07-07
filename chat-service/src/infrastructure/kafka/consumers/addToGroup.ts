import { addUserToGroup } from "../../database/mongo/repositories";

export default async(
    data:any
)=>{
    try {
        console.log(data,'user add to group consumer');
        await addUserToGroup(data)
    } catch (error:any) {
        throw new Error(error);
        
    }
}