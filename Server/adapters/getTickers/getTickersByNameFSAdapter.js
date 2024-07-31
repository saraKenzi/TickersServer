import getDataOfSymbols from "../../readDataFromFS.js/readDataFromFS.js"
 
export default function getTickersByNameFSAdapter(config){
   
    this.getSymbols=()=>{
        let data=getDataOfSymbols(config);
        return data;
    }
}