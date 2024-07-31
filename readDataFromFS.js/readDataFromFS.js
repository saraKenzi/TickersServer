import fs from 'fs';
import { getSymbolAndPath } from "./getSymbolAndPath.js";


let dataArr = [];
// הפונקציה הזו מקבלת מערך של מניות 
//עוברת עליהם בלולאה
//על כל מניה שולחת את הניתוב שלה 
//קוראת את הקובץ לתוך משתנה דטה
//על על מניה מכניסה למשתנה רזלט את שם המניה ואת הנתונים שלה
export default function getDataOfSymbols(pathFile) {
    let symbolsArr = getSymbolAndPath(pathFile);
    symbolsArr.forEach(symbol => {
        let data = readCSVFileSync(symbol.path);
        let resualt = { symbol: symbol.name, data }
        dataArr.push(resualt);
    })
    return dataArr;//[{symbol: data:},{symbol data}]
}

function readCSVFileSync(filePath) {
    try {
        let first = "Date,Open,Low,High,Close,AdjClose,Volume";
        const fileData = fs.readFileSync(filePath, 'utf8');
        let data = fileData.split("\n").filter(row => row != "");
        let ret = data.map(row => row.split(",")
            .reduce((acc, field, index) => {
                return {
                    ...acc, [first.split(",")[index]]: index == 0 ?
                        new Date(field) : parseFloat(field)
                }
            }, {}))
        return ret;


    } catch (error) {
        console.error('Error reading CSV file synchronously:', error);
        throw error;
    }
}
