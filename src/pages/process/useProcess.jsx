import { FaAt, FaEdit, FaTrash } from "react-icons/fa";
import useFetch from "../../hooks/UseFetch";
import { BtnLink, api } from "../../services";
import { useCallback, useEffect, useState } from "react";
import { STATUS_ICONS } from "./TableConfig";
import Swal from "sweetalert2";

const data = new Date();
const data_inicial = Number(data.getMonth());
const datas = {
  begin: new Date(
    2013,
    data_inicial - data_inicial,
    data.getDate() - data.getDate() + 1
  )
    .toISOString()
    .split("T")[0],
  end: new Date(data.getFullYear(), data.getMonth(), 31)
    .toISOString()
    .split("T")[0],
};

export const useProcess = () => {
  const [reload, setReload] = useState(false);
  const [dateFim, setDateFim] = useState(datas.end);
  const [dateInicio, setDateInit] = useState(datas.begin);
  const [showModal, setShowModal] = useState(false);
  const [editProcesso, setEditProcesso] = useState([] || null);
  const [dataSet, setDataSet] = useState([]);
  const [dataSetSearch, setDataSetSearch] = useState([]);
  const [titleModal, setTitleModal] = useState("");
  const [action, setAction] = useState("");
  const [showModalEditGov, setShowModalEditGov] = useState(false);
  const [openSpinner, setOpenSpinner] = useState(false);

  function status(status) {
    const icon = STATUS_ICONS[status];
    if (icon) {
      return (
        <td>
          <span
            data-tootle="tooltip"
            title={status}
            style={{ fontSize: "18px" }}
          >
            {icon}
          </span>
        </td>
      );
    } else {
      return <td>{status}</td>;
    }
  }
  const deleteProcess = (cod) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não será capaz de reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        const response = useFetch.delete(`processos/delete/${cod}`);
        if (response) {
          setReload(!reload);
          Swal.fire("Excluido!", "Seus arquivos foram excluidos.", "success");
        }
      }
    });
  };

  const getDataGovernment = useCallback(async () => {
    setReload("");
    try {
      const response = await useFetch.getDataGovernment();
      const data_set = response.map((item) => {
        const {
          bidding_notice,
          date_finish,
          status: statusName,
        } = item.process_data;

        const [{ name: govermentName }] = item.government.filter((org) =>
          org.manager.includes("true")
        );

        return {
          edital: bidding_notice,
          orgao: govermentName,
          data_final: new Date(date_finish).toISOString().split("T")[0],
          portal: (
            <span className="flex justify-center items-end  gap-2">
              <FaAt className="text-blue-600" />
              <span className="text-blue-700 font-serif first-letter:uppercase lowercase  ">
                {item.process_data.portal}
              </span>
            </span>
          ),
          status: status(statusName),
          e: (
            <span onClick={(e) => deleteProcess(item._id)}>
              <BtnLink
                icon={<FaTrash />}
                size="sm"
                type="danger"
                title={"excluir "}
                to={""}
                exibe={true}
              />
            </span>
          ),
          d: (
            <span onClick={(e) => openModal(item._id, "update")}>
              <BtnLink
                icon={<FaEdit />}
                size="sm"
                type="success"
                title={"editar"}
                to={""}
                exibe={true}
              />
            </span>
          ),
          s: statusName,
          id: item._id,
          p: item.process_data.portal,
        };
      });
      setDataSet(data_set);
      setDataSetSearch(data_set);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataGovernment();
  }, [reload, getDataGovernment]);

  function closeModal(e) {
    e.preventDefault();
    setShowModal(false);
  }

  const createUpdateProcesso = (processo) => {
    switch (action) {
      case "update":
        updateProcesso(processo);
        break;
      case "create":
        createProcesso(processo);
        break;
      default:
        break;
    }
  };

  async function openModal(cod, op) {
    if (op === "create") {
      setTitleModal("Novo processo");
      setAction("create");
    } else {
      setAction("update");
      setTitleModal("Edição do processo");
      const processo = await api.get(`processos/${cod}`).then((response) => {
        return response.data.process[0];
      });
      setEditProcesso(processo);
    }

    setShowModal(true);
  }

  const createProcesso = async (processo) => {
    const response = await useFetch.post(`processos/create`, processo);
    if (response.status === 201) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
      });
      setShowModal(false);
      setReload(true);
    } else {
      Swal.fire("Error", response.message, "error");
    }
  };

  const updateProcesso = async (editProcesso) => {
    const response = await useFetch.put(
      `processos/update/${editProcesso._id}`,
      editProcesso
    );

    if (response.status === 200) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Cadastro atualizado com sucesso!",
      });
      setReload(true);
    }
  };

  function searchProcess(e) {
    //console.log(e);
    try {
      if (e.key === "Enter") {
        //setOpenSpinner(true);
        const { value } = e.target;
        const filteredData = dataSetSearch.filter((item) =>
          [item.orgao, item.edital, item.s, item.p].some((prop) =>
            prop.toLowerCase().includes(value.toLowerCase())
          )
        );

        const processedData = filteredData.map(({ id, e, d, ...data }) => ({
          ...data,
          status: status(data.status),
          e: <span onClick={(e) => deleteProcess(e, id)}>{e}</span>,
          d: <span onClick={(e) => openModal(e, id)}>{d}</span>,
        }));
        setDataSet(processedData);
      }
    } catch (error) {
      //Swal("error", error.message, "erro");
      console.log(error);
    } finally {
      //setOpenSpinner(false);
    }
  }

  const refresh = (e) => {
    e.preventDefault();
    // setDateInit(datas.begin);
    // setDateFim(datas.end);
    if (reload) {
      setReload(false);
    } else {
      setReload(true);
    }
  };

  return {
    searchProcess,
    updateProcesso,
    createProcesso,
    openModal,
    createUpdateProcesso,
    closeModal,
    deleteProcess,
    getDataGovernment,
    titleModal,
    editProcesso,
    showModal,
    dataSet,
    refresh,
    setShowModal,
    action,
    showModalEditGov,
    setShowModalEditGov,
    openSpinner,
    setOpenSpinner,
    dateFim,
    dateInicio,
    setDateFim,
    setDateInit,
  };
};
