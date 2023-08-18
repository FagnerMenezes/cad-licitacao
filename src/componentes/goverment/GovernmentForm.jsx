import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../../services/api";
import Message from "../layout/Menssage";

import { Modal } from "react-bootstrap";
import { FaSave, FaTimes } from "react-icons/fa";
import uuid from "react-uuid";
import "../styles/processo.css";
import { Government } from "./index";

const orgao = {
  name: "",
  cnpj: "",
  contact: [],
  address: [],
};

export function GovernmentForm({ handleSubmit, orgData, btnText }) {
  const [orgaos, setOrgaos] = useState(orgData || orgao);
  const [showModal, setShowModal] = useState(false);
  const [showModalContato, setShowModalContato] = useState(false);
  const [showModalContatoEdit, setShowModalContatoEdit] = useState(false);
  const [showModalEditEnd, setShowModalEditEnd] = useState(false);
  const [endereco, setEndereco] = useState({});
  const [contato, setContato] = useState({});
  const [cod_uuid, setCodUuid] = useState("");
  const [processos, setProcessos] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    msg: "",
    exibe: false,
  });

  useEffect(() => {
    api
      .get(`processos?start=2000-01-01&end=2030-01-01&limit=1000&skip=0`)
      .then((response) => {
        if (orgaos._id !== "") {
          const list = response.data.process.filter(
            (item) => item.government.government_id === orgaos._id
          );
          setProcessos(list);
          // console.log(processos);
        }
      });
  }, [orgaos._id]);

  async function submit(e) {
    if (!(await validaForm())) return;
    handleSubmit(orgaos);
  }

  function getContato(cont) {
    cont._id = uuid();
    orgaos.contact.push(cont);
  }

  function abrirModal(e, cod) {
    setShowModal(true);
    setEndereco("");
  }

  function getEndereco(end) {
    end._id = uuid();
    orgaos.address.push(end);
    setShowModal(false);
  }

  function putEndereco(end) {
    const oldEndereco = orgaos.address.find((item) => item._id === end._id);
    if (oldEndereco) {
      Object.assign(oldEndereco, { ...end });
    }
    setShowModalEditEnd(false);
  }

  function putContato(contato) {
    const list = orgaos.contact.find((item) => item._id === contato._id);

    if (list) {
      Object.assign(list, { ...contato });
    }
    setShowModalContatoEdit(false);
  }

  function excluirContato(contatoId) {
    try {
      const foundItem = orgaos.contact.find((item) => item._id !== contatoId);
      orgaos.contact.splice(orgaos.contact.indexOf(foundItem), 1);
      setOrgaos({
        ...orgaos,
        foundItem,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function editarContato(contatoId) {
    const foundItem = orgaos.contact.filter((item) => item._id === contatoId);
    if (foundItem) {
      setContato(foundItem[0]);
      setShowModalContatoEdit(true);
    }
  }

  function editarEndereco(endId) {
    const foundEnd = orgaos.address.filter((item) => item._id === endId);
    setEndereco(foundEnd[0]);
    setShowModalEditEnd(true);
  }

  function excluirEndereco(endId) {
    try {
      const foundItem = orgaos.address.find((item) => item._id !== endId);
      orgaos.address.splice(orgaos.address.indexOf(foundItem), 1);
      setOrgaos({
        ...orgaos,
        foundItem,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function abrirModalContato() {
    setShowModalContato(true);
  }

  async function validaForm() {
    let schema = yup.object().shape({
      name: yup
        .string("Campo nome obrigatório")
        .required("Campo nome obrigatório"),
      cnpj: yup.string("").required("Campo CNPJ obrigatório"),
      code_government: yup
        .string("")
        .required("Campo código do órgão obrigatório"),
      manager: yup.string().required("Campo UGE gerenciadora"),
      address: yup.array().min(1, "Campo endereço obrigatório"),
      contact: yup.array().min(1, "Campo contato obrigatório"),
    });

    try {
      await schema.validate(orgaos);
      setStatus({});
      return true;
    } catch (err) {
      setStatus({
        type: "erro",
        msg: err.errors,
      });

      return false;
    }
  }

  function handleChange(e) {
    const dados = {
      [e.target.name]: e.target.value,
    };
    setOrgaos({
      ...orgaos,
      ...dados,
    });
  }
  function handleChangeCheck(e) {
    const dados = {
      [e.target.name]: String(e.target.checked),
    };
    setOrgaos({
      ...orgaos,
      ...dados,
    });
  }

  return (
    <>
      {status.msg !== "" ? (
        <Message tipo={status.type} text={status.msg} />
      ) : (
        ""
      )}
      <form className="row g-1">
        <Government.GovernmentData
          data={orgaos}
          handleChange={handleChange}
          handleChangeCheck={handleChangeCheck}
        />
        <Government.ContactDetails
          data={orgaos}
          openModal={abrirModalContato}
          getContact={editarContato}
          deleteContact={excluirContato}
        />
        <Government.AddressDetails
          data={orgaos}
          openModal={abrirModal}
          editAddress={editarEndereco}
          deleteAddress={excluirEndereco}
        />
      </form>
      <br />
      <div className="flex">
        <button
          onClick={submit}
          className=" flex justify-center items-center gap-2 sm:w-44 hover:bg-blue-500  bg-blue-600 p-2 border rounded-xl text-white font-bold"
          style={{ color: "white" }}
        >
          <FaSave /> {"Salvar"}
        </button>
      </div>
      {/**AREA DE MODAL */}
      {/**MODAL CADASTRAR ENDEREÇO */}
      <Modal
        show={showModal}
        cancel={showModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="uppercase text-sm">Cadastrar endereço</span>
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModal(false)} />
        </Modal.Header>
        <Modal.Body>
          <Government.AddressForm
            btnText="Enviar"
            handleSubmitEndereco={getEndereco}
            endData={endereco || {}}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModal(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
      {/**MODAL EDITAR ENDEREÇO */}
      <Modal
        show={showModalEditEnd}
        cancel={showModalEditEnd}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="uppercase text-sm">Editar endereço</span>
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalEditEnd(false)} />
        </Modal.Header>
        <Modal.Body>
          <Government.AddressForm
            btnText="Editar"
            handleSubmitEndereco={putEndereco}
            endData={endereco || {}}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalEditEnd(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
      {/**MODAL CADASTRAR CONTATO */}
      <Modal
        show={showModalContato}
        cancel={showModalContato}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="uppercase text-sm">Cadastrar contato</span>
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalContato(false)} />
        </Modal.Header>
        <Modal.Body>
          <Government.ContactForm
            handleSubmitContato={getContato}
            btnText="Salvar"
            codigo_contato={cod_uuid}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalContato(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
      {/**MODAL EDITAR CONTATO */}
      <Modal
        show={showModalContatoEdit}
        cancel={showModalContatoEdit}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="uppercase text-sm"> Editar contato</span>
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalContatoEdit(false)} />
        </Modal.Header>
        <Modal.Body>
          <Government.ContactForm
            handleSubmitContato={putContato}
            btnText="Salvar"
            contatoData={contato || {}}
            ocultaCampo={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalContatoEdit(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GovernmentForm;
