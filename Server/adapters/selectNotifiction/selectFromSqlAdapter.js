import { connectToDB } from "../../config/DBConfig.js"

export default function selectFromSqlAdapter(config){
    console.log("config:",config);
    this.selectNotifiction=async(query)=>{
        // const query="select * from Notifications_tbl"
        let data =await connectToDB(config,query,[]);
        console.log("הצלחנו לשלוף נתתונים !",data);
        return data;

    }
}