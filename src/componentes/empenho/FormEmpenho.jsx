import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  code_note: yup
    .string("Campo nº do empenho obrigatório ")
    .required("Campo nº do empenho obrigatório "),
  value_note: yup.object({
    $numberDecimal: yup
      .string("Campo valor obrigatório")
      .required("Campo valor obrigatório"),
  }),
  status_note: yup
    .string("Campo status obrigatório")
    .required("Campo status obrigatório"),
  attachment: yup.string(),
});

const Empenho = ({ data, handleSubmitForm }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  async function Submit(data) {
    handleSubmitForm(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(Submit)} className=" flex flex-col gap-1">
        <input
          type="text"
          placeholder="CÓDIGO EMPENHO"
          name="code_note"
          title="Código do empenho"
          {...register("code_note")}
          className="border rounded-md outline-blue-500 p-1"
        />
        {errors.code_note && (
          <p className="text-red-500">{errors.code_note.message}</p>
        )}
        <input
          {...register("value_note.$numberDecimal")}
          placeholder="VALOR"
          type="text"
          name="value_note.$numberDecimal"
          title="Valor do empenho"
          className="border rounded-md outline-blue-500 p-1"
        />
        {errors.value_note && (
          <p className="text-red-500">
            {errors.value_note.$numberDecimal.message}
          </p>
        )}
        <select
          {...register("status_note")}
          name="status_note"
          title="Status"
          className="border rounded-md outline-blue-500 p-1"
        >
          <option value="">Escolha uma opção</option>
          <option value="Pendente">Pendente</option>
          <option value="Faturado">Faturado</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        {errors.status_note && (
          <p className="text-red-500">{errors.status_note.message}</p>
        )}
        <input
          {...register("attachment")}
          type="url"
          placeholder="URL NOTA EMPENHO"
          name="attachment"
          title="Link do empenho"
          className="border rounded-md outline-blue-500 p-1 text-blue-600 text-sm"
        />

        <input
          type="submit"
          value={"Salvar"}
          className="border rounded-md outline-none bg-blue-600 hover:bg-blue-700 p-2 text-white font-bold uppercase"
        />
      </form>
    </>
  );
};
Empenho.propTypes = {
  data: PropTypes.array,
  handleSubmitForm: PropTypes.func,
};

export default Empenho;
