import PropTypes from "prop-types";
import { FaCheckCircle, FaDatabase } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
export function GovernmentData({ data, handleChange, handleChangeCheck }) {
  return (
    <div className="">
      <div className="flex justify-start items-center gap-2 mb-2">
        <FaDatabase className="text-blue-700" />{" "}
        <span className=" text-blue-700 font-bold">Órgão</span>
      </div>
      <div className="grid grid-cols-2 gap-2 border rounded-md p-2 ">
        <div className="border rounded-md flex items-center gap-1 h-10 mt-1">
          <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px] ">
            Nome
          </span>
          <input
            className="w-full outline-none p-1"
            type="text"
            name="name"
            placeholder="Informe o nome do órgão"
            value={data.name ? data.name : ""}
            required="required"
            onChange={handleChange}
          />
        </div>
        <div className="border rounded-md flex items-center gap-1 h-10 mt-1">
          <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px] ">
            CNPJ
          </span>
          <input
            className="w-full outline-none p-1"
            type="text"
            name="cnpj"
            placeholder="Informe o CNPJ"
            value={data?.cnpj}
            required="required"
            onChange={handleChange}
          />
        </div>
        <div className="border rounded-md flex items-center gap-1 h-11 mt-1">
          <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-11 p-1 flex items-center sm:min-w-[100px] ">
            cód órgão
          </span>
          <input
            type="text"
            className="w-full outline-none p-1"
            name="code_government"
            placeholder="Informe o código do órgão"
            onChange={handleChange}
            required="required"
            value={data.code_government ? data.code_government : ""}
          />
        </div>
        <div className=" flex justify-between  items-center h-11 mt-1 overflow-x-auto overflow-y-hidden border rounded-2xl ">
          <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-11 p-1 flex items-center   ">
            Gerenciador
          </span>
          <label className="flex flex-nowrap items-center h-11 hover:cursor-pointer ">
            <div
              className={`${
                data.manager
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-300 text-slate-400"
              } flex justify-center items-center gap-1 h-10 rounded-l-xl border-l-white border-l-2 px-2`}
            >
              Sim
              <FaCheckCircle />
            </div>
            <div
              className={`${
                data.manager
                  ? "bg-gray-200 text-slate-400"
                  : "bg-red-500 text-white"
              } flex justify-center items-center h-10 rounded-r-2xl gap-1 border-r-gray-300 border-r-2 px-2 -mr-3`}
            >
              Não <ImCancelCircle />
            </div>
            <input
              className="invisible"
              type="checkbox"
              checked={data.manager}
              onChange={handleChangeCheck}
              name="nanager"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

GovernmentData.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeCheck: PropTypes.func,
};
