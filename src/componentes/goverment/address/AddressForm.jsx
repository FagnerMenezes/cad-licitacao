import { states } from "@/services/UF";
import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";
import { type_address } from "./schema";
import { useAddress } from "./useAddress";
export function AddressForm({ handleSubmitEndereco, endData, btnText }) {
  const { buscarcep, errors, handleSubmit, register } = useAddress({ endData });

  function submitForm(data) {
    handleSubmitEndereco(data);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col p-2 gap-2"
      >
        TIPO
        <select
          className="border rounded-md p-2 outline-indigo-400"
          {...register("type_address")}
          name="type_address"
        >
          <option value=""></option>
          {!!type_address &&
            type_address.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        {errors.type_dispute && (
          <p className="text-red-600 text-sm">{errors.type_dispute.message}</p>
        )}
        RUA
        <input
          className="border rounded-md p-2 outline-indigo-400"
          type="text"
          placeholder=""
          name="street"
          {...register("street")}
        />
        {errors.street && (
          <p className="text-red-600 text-sm">{errors.street.message}</p>
        )}
        NUMERO
        <input
          className="border rounded-md p-2 outline-indigo-400"
          type="text"
          placeholder=""
          name="number"
          {...register("number")}
        />
        BAIRRO
        <input
          type="text"
          className="border rounded-md p-2 outline-indigo-400"
          placeholder=""
          name="district"
          {...register("district")}
        />
        {errors.district && (
          <p className="text-red-600 text-sm">{errors.district.message}</p>
        )}
        CIDADE
        <input
          {...register("city")}
          type="text"
          className="border rounded-md p-2 outline-indigo-400"
          placeholder=""
          name="city"
        />
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city.message}</p>
        )}
        UF
        <select
          {...register("uf")}
          className="border rounded-md p-2 outline-indigo-400"
          name="uf"
        >
          <option value=""></option>
          {!!states &&
            states.map((item) => (
              <option key={item.id} value={item.sigla}>
                {item.name}
              </option>
            ))}
        </select>
        {errors.uf && (
          <p className="text-red-600 text-sm">{errors.uf.message}</p>
        )}
        <label className="text-slate-700">CEP</label>
        <div className="flex items-center gap-1">
          <input
            className="border rounded-md p-2 outline-indigo-400"
            type="number"
            placeholder=""
            name="zip_code"
            {...register("zip_code")}
            maxLength="8"
          />
          <button
            type="button"
            onClick={() => buscarcep()}
            className="flex border h-10 w-8 items-center justify-center text-blue-600"
          >
            <FaFilter />
          </button>
        </div>
        COMPLEMENTO
        <input
          className="border rounded-md p-2 outline-indigo-400"
          text="Complemento"
          placeholder=""
          name="complement"
          {...register("complement")}
        />
        <input
          type="submit"
          className="bg-blue-500 border rounded-lg p-2 mt-2 text-white w-48 hover:bg-blue-700"
          value={btnText}
        />
      </form>
    </>
  );
}
AddressForm.propTypes = {
  handleSubmitEndereco: PropTypes.func,
  endData: PropTypes.object,
  btnText: PropTypes.string,
};
