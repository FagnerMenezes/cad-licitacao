import { useState, useEffect } from "react";
//import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
//import { FaPlus, FaTimes } from "react-icons/fa";
//import Swal from "sweetalert2";
import styled from "styled-components";
import * as yup from "yup";

import { SubmitButton, InputFloat, api, Select } from "../../services/index";
const Container = styled.div`
  display: flex;
`;
const BtnEnviar = styled.span`
  width: 350px;
  background-color: red;
`;
const Table = styled.table`
  td {
    border: 1px solid lightgray;
    padding: 5px;
  }
  thead {
    text-align: center;
    background-color: #0d6efd;
    color: white;
    font-weight: bolder;
  }
`;

const Empenho = ({ data, handleSubmit, op }) => {
  const [empenho, setEmpenho] = useState(data);
  const [msgValidate, setMsgValidate] = useState({
    type: "",
    msg: "",
  });
  //const [showModal, setShowModal] = useState(false);
  const [processos, setProcesso] = useState([]);

  const status_empenhos = [
    {
      id: "001",
      name: "Pendente",
    },
    {
      id: "002",
      name: "Faturado",
    },
    {
      id: "003",
      name: "Finalizado",
    },
    {
      id: "004",
      name: "Cancelado",
    },
  ];

  const dataFim = new Date();
  useEffect(() => {
    api
      .get(
        `processos?start=2013-01-01&end=${
          new Date(dataFim.getFullYear(), dataFim.getMonth(), 31)
            .toISOString()
            .split("T")[0]
        }&skip=0&limit=1000`
      )
      .then((response) => {
        setProcesso(response.data.process);
        // console.log(response.data.process);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function Submit(e) {
    e.preventDefault();
    if (!(await validate())) return;
    handleSubmit(empenho);
  }
  async function validate() {
    let schema = yup.object().shape({
      code_note: yup
        .string("Campo nº do empenho obrigatório ")
        .required("Campo nº do empenho obrigatório "),
      value_note: yup.object({
        $numberDecimal: yup
          .string("Campo valor obrigatório")
          .required("Campo valor obrigatório"),
      }),
      status_note: yup.object({
        name: yup
          .string("Campo status obrigatório")
          .required("Campo status obrigatório"),
      }),
    });
    try {
      // console.log(empenho);
      await schema.validate(empenho);

      return true;
    } catch (err) {
      setMsgValidate({
        type: "error",
        msg: err.errors,
      });
      return false;
    }
  }

  const handleOnChangeValueNote = (e) => {
    const dados = {
      ...empenho,
      value_note: {
        $numberDecimal: e.target.value,
      },
    };

    setEmpenho({ ...empenho, ...dados });
    // console.log(empenho);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const dados = {
      ...empenho,
      [e.target.name]: e.target.value,
    };
    // console.log(dados);
    setEmpenho({ ...empenho, ...dados });
  };

  const handleOnChangeStatus = (e) => {
    const dados = {
      ...empenho,
      status_note: {
        _id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    };

    setEmpenho({ ...empenho, ...dados });
  };

  const create = async (dados) => {
    // e.preventDefault();
    // api
    //   .post("empenhos/create", dados)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       Swal.fire({
    //         title: "ok",
    //         text: "Empenho cadastrado com sucesso",
    //         icon: "success",
    //       });
    //       setEmpenho({});
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };
  //
  const update = async (dados) => {
    //e.preventDefault();
    // api.put(`empenhos/update/${empenho._id}`, dados).then((response) => {
    //   // console.log(response);
    //   if (response.status === 200) {
    //     Swal.fire({
    //       title: "ok",
    //       text: "Empenho alterado com sucesso",
    //       icon: "success",
    //     });
    //   }
    // });
  };

  return (
    <>
      {msgValidate.type === "success" ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {msgValidate.msg}
        </div>
      ) : (
        ""
      )}
      {msgValidate.type === "error" ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {msgValidate.msg}
        </div>
      ) : (
        ""
      )}
      <form>
        <Container>
          <table>
            <tbody>
              <tr>
                <td>
                  <InputFloat
                    text="Código NE"
                    placeholder="codigo empenho"
                    name="code_note"
                    value={empenho.code_note ? empenho.code_note : ""}
                    handleOnChange={handleOnChange}
                    required={true}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <InputFloat
                    text="Valor NE"
                    placeholder="valor"
                    type="number"
                    name="value_note"
                    value={
                      empenho.value_note
                        ? empenho.value_note.$numberDecimal
                        : ""
                    }
                    handleOnChange={handleOnChangeValueNote}
                    required={true}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Select
                    text="Status"
                    options={status_empenhos}
                    name="status_note"
                    exibeBtn={true}
                    disabled={true}
                    handleOnChange={handleOnChangeStatus}
                    value={empenho.status_note ? empenho.status_note._id : "0"}
                    required={true}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <InputFloat
                    text="Link NE"
                    placeholder="URL NOTA EMPENHO"
                    name="attachment"
                    value={empenho.attachment ? empenho.attachment : ""}
                    handleOnChange={handleOnChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </form>

      <BtnEnviar onClick={(e) => Submit(e)}>
        <SubmitButton text="SALVAR" />
      </BtnEnviar>
    </>
  );
};

export default Empenho;
