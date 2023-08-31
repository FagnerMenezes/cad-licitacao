import { useMemo, useRef, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { AiFillApi } from "react-icons/ai";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../services/api";
import FormConfig from "../form/FormConfig";
import { UseProcessForm } from "./useProcessForm";

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
  const { loadDataBec } = UseProcessForm();
  const [isOpen, setIsOpen] = useState(false);
  const inputRefOc = useRef("");

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
    if (e.target.name === "bidding_notice") {
      inputRefOc.current = e.target.value;
    }
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
  async function searchDataApiPortal(e) {
    e.preventDefault();
    try {
      setIsOpen(true);
      const key = String(processData.process_data.portal).toUpperCase();
      if (key === "BEC") {
        const OC = inputRefOc.current;
        //console.log(OC);
        const { process_data, data_government, reference_term } =
          await loadDataBec(OC);

        const dados = {
          process_data: process_data,
          government: data_government,
          reference_term: reference_term,
        };

        setProcessData({
          ...processData,
          ...dados,
        });
        getDados(dados);
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
    } finally {
      setIsOpen(false);
    }
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
          ref={inputRefOc}
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
      <div className="flex items-center w-full">
        <button
          onClick={(e) => searchDataApiPortal(e)}
          className=" flex items-center bg-emerald-500 border rounded-md text-white font-semibold h-11 p-1 hover:bg-emerald-400"
        >
          {isOpen ? (
            <>
              <span className="text-white">Carregando...</span>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-white fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              {" "}
              <AiFillApi className="text-2xl" /> Carregar dados via api
            </>
          )}
        </button>
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
          <FaTimes onClick={() => fecharModalConfig()} />
        </Modal.Header>
        <Modal.Body>
          <FormConfig collection={collection} />
        </Modal.Body>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => fecharModalConfig()}
          >
            Fechar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DadosGerais;
