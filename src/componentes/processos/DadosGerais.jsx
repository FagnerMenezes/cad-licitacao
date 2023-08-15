import { useEffect, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import api from "../../services/api";
import FormConfig from "../form/FormConfig";
import Input from "../form/Input";
import InputFloat from "../form/InputFloat";
import Select from "../form/Select";

const DadosGerais = ({ getDados, data }) => {
  // console.log(data);
  // const [processo, setProcesso] = useState(data || {});
  const [processData, setProcessData] = useState(data || {});
  const [modalidades, setModalidades] = useState([]);
  const [portais, setPortais] = useState([]);
  const [tipoDisputas, setTipoDisputas] = useState([]);
  const [modalConfig, setModalConfig] = useState(false);
  const [statusProc, setStatusProc] = useState([]);
  const [titleModalConfig, settitleModalConfig] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [collection, setCollection] = useState();

  useEffect(() => {
    api.get("modalidades").then((response) => {
      setModalidades(response.data);
    });

    api.get("portais").then((response) => {
      setPortais(response.data);
    });

    api.get("tipo_disputa").then((response) => {
      setTipoDisputas(response.data);
    });
    api.get("status").then((response) => {
      setStatusProc(response.data);
    });
  }, [refresh]);

  function handleOnChange(e) {
    const dados = {
      process_data: {
        ...processData.process_data,
        [e.target.name]: e.target.value,
      },
    };

    setProcessData({
      ...processData,
      ...dados,
    });
    getDados(dados);
  }

  function handleStatus(e) {
    const dados = {
      process_data: {
        ...processData.process_data,
        status: e.target.options[e.target.selectedIndex].text,
      },
    };

    setProcessData({
      ...processData,
      ...dados,
    });
    getDados(dados);
  }

  function handleModalidade(e) {
    const dados = {
      process_data: {
        ...processData.process_data,
        modality: e.target.options[e.target.selectedIndex].text,
      },
    };

    setProcessData({
      ...processData,
      ...dados,
    });
    getDados(dados);
  }

  function handlePortal(e) {
    const dados = {
      process_data: {
        ...processData.process_data,
        portal: e.target.options[e.target.selectedIndex].text,
      },
    };

    setProcessData({
      ...processData,
      ...dados,
    });
    getDados(dados);
  }

  function handleTypeDisputa(e) {
    const dados = {
      process_data: {
        ...processData.process_data,
        type_dispute: e.target.options[e.target.selectedIndex].text,
      },
    };

    setProcessData({
      ...processData,
      ...dados,
    });
    getDados(dados);
  }

  function abrirModalConfig(e, mongoCollection, title) {
    e.preventDefault();
    // alert(mongoCollection);
    setCollection(mongoCollection);
    setModalConfig(true);
    settitleModalConfig(title);
    setRefresh(false);
  }

  function fecharModalConfig() {
    setModalConfig(false);
    setRefresh(true);
  }

  return (
    <div className="col-md-12">
      <br />
      <div className="row g-1">
        <div className={`col-md-4`}>
          <InputFloat
            type="text"
            text="Nº do processo"
            name="n_process"
            placeholder="Informe o nº do processo"
            handleOnChange={handleOnChange}
            required="required"
            value={
              processData.process_data ? processData.process_data.n_process : ""
            }
          />
        </div>
        <div className={`col-md-4`}>
          <InputFloat
            type="text"
            text="Nº do edital"
            name="bidding_notice"
            placeholder="Informe o nº do edital"
            handleOnChange={handleOnChange}
            required="required"
            value={
              processData.process_data
                ? processData.process_data.bidding_notice
                : ""
            }
          />
        </div>

        <div className="col-md-4">
          <Input
            type="date"
            text="Data inicial"
            name="date_init"
            handleOnChange={handleOnChange}
            value={
              processData != null && processData.process_data?.date_init
                ? new Date(processData.process_data.date_init)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            required={true}
          />
        </div>
        <div className={`col-md-4`}>
          <Input
            type="date"
            text="Data disputa"
            name="date_finish"
            handleOnChange={handleOnChange}
            value={
              processData != null && processData.process_data.date_finish
                ? new Date(processData.process_data.date_finish)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            required={true}
          />
        </div>
        <div className={`col-md-4`}>
          <Input
            type="time"
            text="Hórario da disputa"
            name="hours_finish"
            handleOnChange={handleOnChange}
            value={
              processData.process_data.hours_finish
                ? processData.process_data.hours_finish
                : "00:00"
            }
          />
        </div>
        <div className={`col-md-8`}>
          <Input
            type="text"
            text="Objeto"
            name="object"
            placeholder="Informe o objeto"
            handleOnChange={handleOnChange}
            value={
              processData.process_data ? processData.process_data.object : ""
            }
          />
        </div>
        <div className={`col-md-4`}>
          <Select
            text="Modalidade"
            name="modality"
            options={modalidades}
            handleOnChange={handleModalidade}
            value={
              processData.process_data !== ""
                ? processData.process_data.modality
                : ""
            }
            buttonClick={(e) =>
              abrirModalConfig(e, "modalidades", "Modalidades")
            }
            exibeBtn={true}
          />
        </div>
        <div className={`col-md-4`}>
          <Select
            text="Portal"
            name="portal"
            options={portais}
            handleOnChange={handlePortal}
            value={
              processData.process_data ? processData.process_data.portal : ""
            }
            buttonClick={(e) => abrirModalConfig(e, "portais", "Portais")}
            exibeBtn={true}
          />
        </div>
        <div className={`col-md-4`}>
          <Select
            text="Tipo de disputa"
            name="type_dispute"
            options={tipoDisputas}
            handleOnChange={handleTypeDisputa}
            value={
              processData.process_data
                ? processData.process_data.type_dispute
                : ""
            }
            buttonClick={(e) =>
              abrirModalConfig(e, "tipo_disputas", "Tipo Disputa")
            }
            exibeBtn={true}
          />
        </div>
        <div className="col-md-4">
          <Select
            text="Status"
            name="status"
            options={statusProc}
            handleOnChange={handleStatus}
            value={
              processData.process_data.status
                ? processData.process_data.status
                : ""
            }
            buttonClick={(e) => abrirModalConfig(e, "status", "Status")}
            exibeBtn={true}
          />
        </div>
      </div>

      {/**MODAL CONFIGURAÇÕES */}
      <Modal
        show={modalConfig}
        cancel={modalConfig}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title>{titleModalConfig}</Modal.Title>
          <FaTimes onClick={(e) => fecharModalConfig()} />
        </Modal.Header>
        <Modal.Body>
          <FormConfig collection={collection} />
        </Modal.Body>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={(e) => fecharModalConfig()}
          >
            Fechar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DadosGerais;
