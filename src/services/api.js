import axios from "axios";

export default axios.create({
  //baseURL: "http://www.cadlicita.kinghost.net:21052/",
  //baseURL: "https://api-licitacao.vercel.app/",
  baseURL: "http://localhost:21052/",
  withCredentials: false,
});
