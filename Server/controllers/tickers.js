import selectNotifictionsFromDB from "../adapters/selectNotifiction/testSelectFromDB.js";

export const getAllTickers = async (req, res) => {
    let page = parseInt(req.query.page) || 1; // שינוי: המרה ל-int
    let perPage = parseInt(req.query.perPage) || 10; // שינוי: המרה ל-int
    let { column, val, type, start, end } = req.query;
    try {
        let data = [];
        data = await selectNotifictionsFromDB(column, val, type, start, end);
        console.log("data----->", data);

        let paginatedData = data.slice((page - 1) * perPage, ((page - 1) * perPage) + perPage); // שינוי: יצירת paginatedData
        console.log((page - 1) * perPage,"from");
        console.log(((page - 1) * perPage) + perPage,"to");
        console.log(paginatedData);
        
        
        let total = data.length; // שינוי: הגדרת total

        res.json({ data: data, total }); // שינוי: החזרת total ב-json

    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tickers" });
    }
};




