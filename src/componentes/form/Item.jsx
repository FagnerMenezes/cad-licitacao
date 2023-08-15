import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as y from "yup";

const schemaItem = y.object().shape({
  cod: y.string().required("Campo código é obrigatório"),
  winner: y.boolean(),
  amount: y.number().required("Campo quantidade obrigatório"),
  lote: y.string(),
  unit: y.string().required("Campo unidade de referência é obrigatório"),
  description: y.string().required("Campo descrição é obrigatório"),
  brand: y.string(),
  model: y.string(),
  unitary_value: y.object({
    $numberDecimal: y
      .string()
      .required("Campo valor de unitário é obrigatório"),
  }),
  value_reference: y.object({
    $numberDecimal: y
      .string()
      .required("Campo valor de referência é obrigatório"),
  }),
  item_balance: y.number().required("Campo saldo da ata é obrigatório"),
});

const Item = ({ data, handleSubmitForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(schemaItem),
  });

  function submit(data) {
    handleSubmitForm(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-2 gap-1">
          <input
            {...register("cod")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="cod"
            placeholder={"Código"}
            title="Código"
          />

          <input
            {...register("lote")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="lote"
            placeholder={"Lote"}
            title="Lote"
          />

          <input
            {...register("amount")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="amount"
            placeholder={"Qtde"}
            title="Quantidade"
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}
          <div className="flex flex-col w-full border rounded-md">
            <select
              {...register("unit")}
              className="outline-none border-none appearance-none text-slate-400 ml-1"
              name="unit"
              title="Unidade de medida"
            >
              <option value="">Escolha a unidade</option>
              <option value="kg">KG</option>
              <option value="und">UND</option>
              <option value="lata">LATA</option>
              <option value="bobina">BOBINA</option>
              <option value="metro">METRO</option>
            </select>
          </div>

          {errors.unit && <p className="text-red-500">{errors.unit.message}</p>}

          <input
            {...register("brand")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="brand"
            placeholder={"Marca"}
            title="Marca"
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}
          <input
            {...register("model")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="model"
            placeholder={"Modelo"}
            title="Modelo"
          />
          {errors.model && (
            <p className="text-red-500">{errors.model.message}</p>
          )}
          <input
            {...register("unitary_value.$numberDecimal")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="unitary_value.$numberDecimal"
            placeholder="Valor Unitário"
            title="Valor unitário"
          />
          {errors.value_reference && (
            <p className="text-red-500">
              {errors.value_reference.$numberDecimal.message}
            </p>
          )}
          <input
            {...register("value_reference.$numberDecimal")}
            className="outline-none border rounded-md p-1"
            type="text"
            name="value_reference.$numberDecimal"
            placeholder={"Valor de Referência"}
            title="Valor de referência"
          />

          <input
            {...register("item_balance")}
            className="outline-none border rounded-md p-1"
            type="number"
            name="item_balance"
            placeholder={"Saldo da ata"}
            title="Saldo da ata"
          />
          {errors.item_balance && (
            <p className="text-red-500">{errors.item_balance.message}</p>
          )}

          <label className="flex justify-start items-center gap-3 text-slate-400 w-full border rounded-md p-1">
            Item arrematado ?
            <input
              {...register("winner")}
              type={"checkbox"}
              name="winner"
              className="accent-emerald-600 mt-1"
            />
          </label>
        </div>
        <div className="flex flex-col border rounded-md w-full mt-2 ">
          <textarea
            {...register("description")}
            className="w-full outline-none border-none "
            name="description"
            placeholder="Descrição"
            title="Descrição do produto"
          ></textarea>
        </div>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <button
          type="submit"
          className="text-white font-bold bg-blue-600 hover:bg-blue-800 border rounded-md px-4 py-2 outline-none mt-2"
        >
          Salvar
        </button>
      </form>
    </>
  );
};

Item.propTypes = {
  data: PropTypes.object,
  handleSubmitForm: PropTypes.func,
};

export default Item;
