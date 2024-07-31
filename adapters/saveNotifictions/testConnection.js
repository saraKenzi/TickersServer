import config from "../config.json" assert {"type": "json"};

async function importAdapter(adapterPath) {
    return await import(adapterPath);
}


export default async function connectAndsaveData(type, symbol, date, high, low, open, close, volume) {
    const adapterModule = await importAdapter(config.connection.adapter);
    const Iconnection = adapterModule.default;
    const connection = new Iconnection(config.connection.connectionString);
    connection.saveNotifictions(type, symbol, date, high, low, open, close, volume); 
    
}