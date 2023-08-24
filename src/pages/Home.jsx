import { useEffect, useState } from "react";
import { FaChartBar, FaHotel, FaMoneyCheckAlt } from "react-icons/fa";
import api from "../services/api";

const data = new Date();
const diaFinal = data.getMonth() === 1 ? 28 : 31;
const datas = {
  begin: new Date(1990, 0, 1).toISOString().split("T")[0],
  end: new Date(data.getFullYear(), data.getMonth(), diaFinal)
    .toISOString()
    .split("T")[0],
};

function Home() {
  const [totalProcesos, setTotalProcessos] = useState([]);

  useEffect(() => {
    api
      .get(`processos?start=${datas.begin}&end=${datas.end}&limit=1000&skip=0`)
      .then((response) => {
        setTotalProcessos(response.data.total);
        // setTotalProcessos(useFetch.getDataGovernment());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <section className="sm:grid sm:grid-cols-3 gap-3 justify-center items-center flex-col">
          <div className="flex flex-col gap-2 justify-center items-center border rounded-xl bg-blue-500 p-2">
            <FaChartBar className="w-12 h-12 text-white bg-blue-500" />
            <p className="text-white font-serif ">Processos Cadastrados</p>
            <h3 className="text-4xl font-bold text-gray-700 border rounded-full border-yellow-400 bg-yellow-400 p-2">
              {totalProcesos}
            </h3>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center border rounded-xl bg-blue-500 p-2">
            <FaMoneyCheckAlt className=" w-12 h-12 text-white bg-blue-500" />
            <p className="text-white font-serif">Empenhos Cadastrados</p>
            <h3 className="text-4xl font-bold text-gray-700 border rounded-full border-yellow-400 bg-yellow-400 p-2">
              {"00"}
            </h3>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center  border rounded-xl bg-blue-500 p-2">
            <FaHotel className="w-12 h-12 text-white bg-blue-500" />
            <p className="text-white font-serif">Órgãos Cadastrados</p>
            <h3 className="text-4xl font-bold text-gray-700 border rounded-full border-yellow-400 bg-yellow-400 p-2">
              {"00"}
            </h3>
          </div>
        </section>
        <section className="flex justify-start items-center gap-3 mt-4"></section>
      </div>
    </>
  );
}

export default Home;
