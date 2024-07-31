import config from "../config.json" assert { "type": "json" };
import { connectToDB } from "../../config/DBConfig.js";

async function importAdapter(adapterPath) {
    return await import(adapterPath);
}

export default async function selectNotifictionsFromDB(query) {
    const adapterModule = await importAdapter(config.selectFromDB.adapter);
    const Iconnection = adapterModule.default;

    const connection = new Iconnection(config.selectFromDB.connectionString);
    let data = connection.selectNotifiction(query);
    return data;
}
