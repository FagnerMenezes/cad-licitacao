import styled from "styled-components";
import useContact from "./useContact";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 350px;
  padding: 2px;
  input {
    border: 1px solid lightgray;
    border-radius: 10px;
    outline-color: rgb(108, 162, 216);
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
  }
  table {
  }
  span {
    font-weight: bold;
    color: rgb(110, 109, 109);
    font-size: 14px;
  }
  div {
    margin-top: 5px;
    width: 150px;
  }
`;

export function ContactForm({ contatoData, handleSubmitContato, btnText }) {
  const { tipo, register, handleSubmit, errors } = useContact(contatoData);

  const onSubmitForm = (data) => {
    handleSubmitContato(data);
  };

  return (
    <>
      <form
        className="flex flex-col p-2 gap-1"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <span>Tipo de contato</span>
        <select
          className="border rounded-md p-2 outline-indigo-400"
          name="tipo"
          {...register("tipo")}
        >
          <option value=""></option>
          <option value="Tel">TEL</option>
          <option value="Email">EMAIL</option>
          <option value="Whatsapp">WHATSAPP</option>
          {/* {!!tipo &&
            tipo.map((item) => <option value={item.id}>{item.name}</option>)} */}
        </select>
        {!!errors.tipo && <p className="text-red-600">{errors.tipo.message}</p>}
        <input
          {...register("name")}
          className="border rounded-md p-2 outline-indigo-400"
          type="text"
          placeholder="Informe o nome do contato"
          name="name"
        />
        {!!errors.name && <p className="text-red-600">{errors.name.message}</p>}
        <input
          {...register("sector")}
          className="border rounded-md p-2 outline-indigo-400"
          type="text"
          placeholder="Informe o setor "
          name="sector"
        />
        {!!errors.sector && (
          <p className="text-red-600">{errors.sector.message}</p>
        )}
        <input
          {...register("contact")}
          className="border rounded-md p-2 outline-indigo-400"
          type="text"
          placeholder="Informe o email/Tel"
          name="contact"
        />
        {!!errors.contact && (
          <p className="text-red-600">{errors.contact.message}</p>
        )}
        <input
          type="submit"
          className="bg-blue-600 text-white font-bold border rounded-md outline-none p-2 hover:bg-blue-500 flex justify-center items-center"
          value={btnText}
        />
      </form>
    </>
  );
}
