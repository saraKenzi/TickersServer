// import smaParamsJson from './sma.json' assert {'type': 'json'};
import connectAndsaveData from '../../../adapters/saveNotifictions/testConnection.js';
// import saveNotifactionInDB from '../../../controllers/saveNotificationsInDB.js';
import calcSma from '../../functions/calcSma.js';
export default class sma {

    valueFunc = undefined;

   
    checkNotificationByUpOrDown(a, b, todayCandle, upOrDown, symbol, length,minimalDiffPrecents,funcName) {
        
        if (a > b && (a - b) / a > minimalDiffPrecents) {
            console.log(`--------------- sma_${upOrDown}_${funcName}_${length} --------------------`,todayCandle);
            connectAndsaveData(`sma_${upOrDown}_${funcName}_${length}`, symbol, todayCandle.Date, todayCandle.High, todayCandle.Low, todayCandle.Open, todayCandle.Close, todayCandle.Volume)
            return { type: `sma_${upOrDown}_${length}`, candle: todayCandle }
        }
        return { type: "sma", candle: undefined };
    }


    execute(symbol, data, params) {
        // {length,upOrDown,symbol,func}

        let { length, upOrDown, func,minimalDiffPrecents } = params;
        let funcName=func.split('.')[1];
        if (!this.valueFunc)
            this.valueFunc = eval('(' + func + ')');
        let todayCandle = data[length - 1];
        let todayValue = this.valueFunc(data[data.length - 1]);
        let obj = {
            up: (todayValue, todaySma, todayCandle, symbol, length,minimalDiffPrecents,funcName) => {
                return this.checkNotificationByUpOrDown(todayValue, todaySma, todayCandle, "up", symbol, length,minimalDiffPrecents,funcName);
            }, down: (todayValue, todaySma, todayCandle, symbol, length,minimalDiffPrecents,funcName) => {
                return this.checkNotificationByUpOrDown(todaySma, todayValue, todayCandle, "down", symbol, length,minimalDiffPrecents,funcName);
            }
        }
        if (data.length >= length) {
            let todaySma = calcSma(data, length, this.valueFunc);
            obj[upOrDown](todayValue, todaySma, todayCandle, symbol, length,minimalDiffPrecents,funcName);
        }
    }
}