import { creatChat } from "../../database/mongo/repositories";

export default async(
    data:any
)=>{
    try {
        console.log(data,'-----------------------------');
        await creatChat(data)
    } catch (error) {
        
    }
}