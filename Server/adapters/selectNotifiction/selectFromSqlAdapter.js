import { connectToDB } from "../../config/DBConfig.js";

export default function selectFromSqlAdapter(config) {
    console.log("config:", config);
    this.selectNotifiction = async (column, val, type, start, end) => {
        let query = `EXEC SelectNotifications @column=?, @val=?, @type=?, @start=?, @end=?`;
        let params = [column || null, val || null, type || null, start || null, end || null];

        // console.log("Query:", query, "Params:", params);
        
        let data = await connectToDB(config, query, params);
        return data;
    }
}
