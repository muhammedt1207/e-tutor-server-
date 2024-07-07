import { creatChat } from "../../database/mongo/repositories"

export default async(
    data:any
)=>{
    try {
        await creatChat(data)
        console.log(data,'++++++++++++++++++++++++')
    } catch (error) {
        console.log(error);
        
    }
}

