import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import FormConfig from "../form/FormConfig";

const DadosGerais = ({ getDados, data }) => {
  const [processData, setProcessData] = useState(data || {});
  const [modalidades, setModalidades] = useState([]);
  const [portais, setPortais] = useState([]);
  const [tipoDisputas, setTipoDisputas] = useState([]);
  const [modalConfig, setModalConfig] = useState(false);
  const [statusProc, setStatusProc] = useState([]);
  const [titleModalConfig, settitleModalConfig] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [collection, setCollection] = useState();

  useMemo(() => {
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
    //setRefresh(false);
  }

  function fecharModalConfig() {
    setModalConfig(false);
    setRefresh(!refresh);
  }
  return (
    <div className="grid sm:grid-cols-3 gap-1 grid-cols-1">
      <div className="border rounded-md flex items-center gap-1 h-8">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-8 p-1 flex items-center sm:min-w-[100px]">
          Nº processo
        </span>
        <input
          className="outline-none w-full "
          type="text"
          name="n_process"
          placeholder="Informe o nº do processo"
          onChange={handleOnChange}
          required="required"
          value={
            processData.process_data ? processData.process_data.n_process : ""
          }
        />
      </div>
      <div className="border rounded-md flex items-center gap-1 h-8">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-8 p-1 flex items-center sm:min-w-[100px]">
          Edital
        </span>
        <input
          className="w-full outline-none text-blue-700 font-bold"
          type="text"
          name="bidding_notice"
          placeholder="Informe o nº do edital"
          onChange={handleOnChange}
          required="required"
          value={
            processData.process_data
              ? processData.process_data.bidding_notice
              : ""
          }
        />
      </div>
      <div className="border rounded-md flex items-center gap-1 h-8">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-8 p-1 flex items-center sm:min-w-[100px]">
          Data inicial
        </span>
        <input
          className="w-full outline-none"
          type="date"
          name="date_init"
          onChange={handleOnChange}
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
      <div className="border rounded-md flex items-center gap-1 h-8">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-8 p-1 flex items-center sm:min-w-[100px]">
          Data final
        </span>
        <input
          className="w-full outline-none"
          type="date"
          name="date_finish"
          onChange={handleOnChange}
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
      <div className="border rounded-md flex items-center gap-1 h-8">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-8 p-1 flex items-center sm:min-w-[100px]">
          Hs disputa
        </span>
        <input
          className="w-full outline-none"
          type="time"
          name="hours_finish"
          onChange={handleOnChange}
          value={
            processData.process_data.hours_finish
              ? processData.process_data.hours_finish
              : "00:00"
          }
        />
      </div>
      <div className="border rounded-md flex items-center gap-1 h-8">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-8 p-1 flex items-center sm:min-w-[100px]">
          objeto
        </span>
        <input
          className="w-full outline-none"
          type="text"
          name="object"
          placeholder="Informe o objeto"
          onChange={handleOnChange}
          value={
            processData.process_data ? processData.process_data.object : ""
          }
        />
      </div>
      <div className={`border rounded-md flex items-center gap-1 h-10 mt-1`}>
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px]">
          Modalidade
        </span>
        <select
          className="outline-none w-full appearance-none "
          onChange={handleModalidade}
          value={
            processData.process_data ? processData.process_data.modality : ""
          }
        >
          <option value="0" key="0">
            Selecione uma opção
          </option>
          {modalidades.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white h-10 p-1 rounded-tr-md rounded-br-md hover:bg-sky-500"
          onClick={(e) => abrirModalConfig(e, "modalidades", "Modalidades")}
        >
          <FaPlus />
        </button>
      </div>
      <div className={`border rounded-md flex items-center gap-1 h-10 mt-1`}>
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px]">
          portal
        </span>
        <select
          className="outline-none w-full appearance-none "
          name="portal"
          onChange={handlePortal}
          value={
            processData.process_data ? processData.process_data.portal : ""
          }
        >
          <option value="0" key="0">
            Selecione uma opção
          </option>
          {portais.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white h-10 p-1 rounded-tr-md rounded-br-md hover:bg-sky-500"
          onClick={(e) => abrirModalConfig(e, "portais", "Portais")}
        >
          <FaPlus />
        </button>
      </div>
      <div className={`border rounded-md flex items-center gap-1 h-10 mt-1`}>
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px]">
          tipo disputa
        </span>
        <select
          className="outline-none w-full appearance-none "
          name="type_dispute"
          onChange={handleTypeDisputa}
          value={
            processData.process_data
              ? processData.process_data.type_dispute
              : ""
          }
        >
          <option value="0" key="0">
            Selecione uma opção
          </option>
          {tipoDisputas.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white h-10 p-1 rounded-tr-md rounded-br-md hover:bg-sky-500"
          onClick={(e) => abrirModalConfig(e, "tipo_disputas", "Tipo Disputa")}
        >
          <FaPlus />
        </button>
      </div>
      <div className={`border rounded-md flex items-center gap-1 h-10 mt-1`}>
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px]">
          status
        </span>
        <select
          className="outline-none w-full appearance-none "
          name="status"
          onChange={handleStatus}
          value={
            processData.process_data.status
              ? processData.process_data.status
              : ""
          }
        >
          <option value="0" key="0">
            Selecione uma opção
          </option>
          {statusProc.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white h-10 p-1 rounded-tr-md rounded-br-md hover:bg-sky-500"
          onClick={(e) => abrirModalConfig(e, "status", "Status")}
        >
          <FaPlus />
        </button>
      </div>
      <div className="border rounded-md flex items-center gap-1 h-10 mt-1">
        <span className="uppercase text-sm bg-blue-600 text-white rounded-tl-md rounded-bl-md h-10 p-1 flex items-center sm:min-w-[100px] ">
          UASG
        </span>
        <input
          className="outline-none w-full text-blue-700 font-bold"
          readOnly
          type="text"
          value={processData.government[0]?.code_government}
        />
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
DadosGerais.propTypes = {
  getDados: PropTypes.func,
  data: PropTypes.array,
};

export default DadosGerais;
