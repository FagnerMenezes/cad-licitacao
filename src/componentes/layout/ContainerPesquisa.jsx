import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
const ContainerPesquisa = ({
  handleDateInit,
  handleDateEnd,
  handleChangeLocalizar,
  dateInicio,
  dateFim,
  exibeDate = false,
}) => {
  return (
    <div className="flex justify-end m-auto w-full">
      <div
        className="
            group
            flex 
            gap-2
            items-center
            sm:w-96
            border 
            rounded-lg 
            h-9 
            mb-2 
            mt-2 
            outline-blue-400 
            p-1
            hover:ring-1 ring-blue-500"
      >
        <input
          className="w-96 outline-none"
          type="search"
          placeholder="Localizar"
          onKeyDown={handleChangeLocalizar}
        />
        <FaSearch className="text-slate-400 ml-2 hover:text-blue-500" />
      </div>
    </div>
  );
};
ContainerPesquisa.propTypes = {
  handleDateInit: PropTypes.func,
  handleDateEnd: PropTypes.func,
  handleChangeLocalizar: PropTypes.func,
  dateInicio: PropTypes.string,
  dateFim: PropTypes.string,
  exibeDate: PropTypes.bool,
  isOpen: PropTypes.bool,
};

export default ContainerPesquisa;
