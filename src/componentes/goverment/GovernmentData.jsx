import PropTypes from "prop-types";
import { FaDatabase } from "react-icons/fa";
import InputFloat from "../form/InputFloat";
import ToggleSwitch from "../layout/ToggleSwitch";

export function GovernmentData({ data, handleChange, handleChangeCheck }) {
  return (
    <div open={true}>
      <div className="flex justify-start items-center gap-2 mb-2">
        <FaDatabase className="text-blue-700" />{" "}
        <span className=" text-blue-700 font-bold">Órgão</span>
      </div>
      <div className="grid grid-cols-2 gap-2 border rounded-md p-2">
        <InputFloat
          type="text"
          text="Nome"
          name="name"
          placeholder="Informe o nome do órgão"
          value={data.name ? data.name : ""}
          required="required"
          handleOnChange={handleChange}
        />

        <InputFloat
          type="text"
          text="CNPJ"
          name="cnpj"
          placeholder="Informe o CNPJ"
          value={data.cnpj ? data.cnpj : ""}
          required="required"
          handleOnChange={handleChange}
        />

        <InputFloat
          type="text"
          text="Código UGE"
          name="code_government"
          placeholder="Informe o código do órgão"
          handleOnChange={handleChange}
          required="required"
          value={data.code_government ? data.code_government : ""}
        />
        <div className="flex">
          <ToggleSwitch
            handleCLick={handleChangeCheck}
            value={data.manager}
            name={"manager"}
            texto={"UGE Gerenciadora?"}
          />
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
