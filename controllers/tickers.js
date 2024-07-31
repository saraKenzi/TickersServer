import selectNotifictionsFromDB from "../adapters/selectNotifiction/testSelectFromDB.js";

export const getAllTickers = async (req, res) => {
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 10;
    let { column,val,type,start,end } = req.query;
    try {
        let data = [];
        if(column&&val&&type&&start&&end){
            data= await selectNotifictionsFromDB(`select * from Notifications_tbl where ${column} like '%${val}%' and [${type}] between ${start} and ${end} `)
        }
        else if (column&&val) {
            data = await selectNotifictionsFromDB(`select * from Notifications_tbl where ${column} like '%${val}%'`);
        }
        else if(type&&start&&end){
            data= await selectNotifictionsFromDB(`select * from Notifications_tbl where [${type}] between ${start} and ${end} `)
        }
    
        else{
            data = await selectNotifictionsFromDB("select * from Notifications_tbl");
        }
        data=data.slice((page-1)*perPage,((page-1)*perPage)+perPage)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tickers" });
    }
};




