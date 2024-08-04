import axios from "axios";

let baseUrl = "";

const getAllTickers = (page, perPage, search) => {
    return axios.get(`${baseUrl}?page=${page}&&perPage=${perPage}&&search=${search}`);
}
export {getAllTickers};
