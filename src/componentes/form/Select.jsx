import { FaPlus } from "react-icons/fa";

function Select({
  text,
  name,
  options,
  handleOnChange,
  value,
  buttonClick,
  exibeBtn = false,
  disabled = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-slate-600 font-bold" htmlFor={name}>
        {text}
      </label>

      <div className="flex items-center ">
        <select
          className="h-10 outline-none border-[1px] border-blue-600 
          border-r-0 appearance-none rounded-tl-md rounded-bl-md px-2"
          name={name}
          id={name}
          onChange={handleOnChange}
          value={value || ""}
        >
          <option value="0">Selecione uma opção</option>
          {options.map((item) => (
            <option value={item.id} key={item.id} className="text-xs">
              {item?.name ? item.name : item.sigla}
            </option>
          ))}
        </select>
        {exibeBtn && (
          <button
            onClick={buttonClick}
            disabled={disabled}
            className="items-center text-white bg-blue-700 
            border rounded-br-md rounded-tr-md p-1 hover:bg-blue-500 h-11 outline-2 outline-blue-700"
          >
            <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
}

export default Select;
