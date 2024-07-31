import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
//לשולף את השם של הסימבול ואת הניתוב שלו
//יצירת מערך המכיל את כל שמות הסימבולים (המניות)

export function getSymbolAndPath() {
    const __filename = fileURLToPath(import.meta.url);        // שליה של שם הקובץ
        const __dirname = path.dirname(__filename);           // שליפת שם התקיה של הקובץ

    const dataDir = path.join(__dirname, '../DATA');          //מציאת הניוב של קובץ הדטה שלנו 
    const files = fs.readdirSync(dataDir, { withFileTypes: true })//שמות כל הקבצים כולל הסיומת שלהם.
   
    let symbolsArr = [];
  
    for (const file of files) { //מעבר על כל שמות הקבצים
        const filePath = path.join(dataDir, file.name); // הניתוב הספציפי לקובץ לפי השם שלו
        const fileName = path.parse(file.name).name; // את השם של הקובץ ללא סיומת כלומר שם המנניה fileשליפה מה 
        let symbolObj = { name: fileName, path: filePath }; // יצירת אובייקט המכיל את שם המניה והניתוב אליה
        symbolsArr.push(symbolObj); // הכנסת האובייקט למערך שיצרנו בשורה 14
    }
    return symbolsArr; // החזרת המערך
    // 
}