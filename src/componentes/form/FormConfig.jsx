import { useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import Swal from "sweetalert2";
import api from "../../services/api";

const Input = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: lightgray;
  height: 35px;
  width: 270px;
`;

const FormConfig = ({ collection }) => {
  const [dados, setDados] = useState({
    _id: "",
    name: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      api
        .post(`${collection}/create`, dados)
        .then((response) => {
          //console.log(response);
          if (response.status === 200 || 201) {
            Swal.fire({
              title: "OK",
              text: "Cadastro realizado com sucesso",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "erro",
            text: err,
            icon: "error",
          });
          console.log(err);
        });
    } catch (error) {
      Swal.fire({
        title: "erro",
        text: error,
        icon: "error",
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDados({
      _id: uuid(),
      name: e.target.value,
    });
  };

  return (
    <>
      <form>
        <Input
          type="text"
          value={dados.name || ""}
          onChange={handleChange}
          placeholder={`informe o(a)s ${collection}`}
        ></Input>
      </form>
      <div>
        <button
          className="text-white font-bold  bg-blue-600 hover:bg-blue-700 border rounded-md outline-none p-2 mt-2"
          onClick={(e) => onSubmit(e)}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FormConfig;
