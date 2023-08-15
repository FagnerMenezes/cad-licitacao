import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import {
  BtnLink,
  ContainerBody,
  ContainerGeral,
  ContainerHeader,
  ContainerPesquisa,
  ContainerTable,
  DataTable,
  FormEmpenho,
  api,
} from "../services/index";

function Empenhos() {
  const [empenho, setEmpenho] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  // const [dataSetProcesso, setdataSetProcesso] = useState([]);
  const [reload, setReload] = useState(false);
  const dataFim = new Date();

  const abriModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const enviarDadosEditar = async (cod) => {
    const processos = await api
      .get(
        `processos?start=2013-01-01&end=${
          new Date(dataFim.getFullYear(), dataFim.getMonth(), 31)
            .toISOString()
            .split("T")[0]
        }&skip=0&limit=1000`
      )
      .then((result) => {
        return result.data.process.note_commitment;
      });

    // const dados = {
    //   _id: response.data._id,
    //   code_note: response.data.code_note,
    //   process_id: response.data.process_id,
    //   value_note: {
    //     $numberDecimal: response.data.value_note.$numberDecimal,
    //   },
    //   createdAt: response.data.createdAt,
    //   updatedAt: response.data.updatedAt,
    //   status_note: response.data.status_note,
    //   dados_processo: processos
    //     .filter((item) => item._id.includes(response.data.process_id))
    //     .map((item) => item),
    // };

    //setEmpenho(dados);
    setShowModalEdit(true);
    //console.log(dados);
  };

  const deleteEmpenho = (e, cod) => {
    e.preventDefault();
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
        api
          .delete(`empenhos/delete/${cod}`)
          .then((response) => {
            Swal.fire("Excluido!", "Seus arquivos foram excluidos.", "success");
          })
          .catch((err) => {
            Swal.fire("Erro", err.response.data.message, "error");
          });
        refreshPage(true);
      }
    });
  };

  const refreshPage = (refresh) => {
    if (reload) {
      setReload(false);
    } else {
      setReload(refresh);
    }
  };

  const col = [
    {
      name: "Órgão",
      sortable: true,
      selector: (row) => row.orgao,
      width: "200px",
    },
    {
      name: "Nº do empenho",
      sortable: true,
      selector: (row) => row.empenho,
      width: "200px",
    },
    {
      name: "Valor R$",
      sortable: true,
      selector: (row) => row.valor,
      maxWidth: "350px",
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
      maxWidth: "150px",
      center: true,
    },
    { name: "", sortable: true, selector: (row) => row.e, maxWidth: "70px" },
    { name: "", sortable: true, selector: (row) => row.d, maxWidth: "70px" },
  ];

  const fetcData = async () => {
    const processos = await api
      .get(
        `processos?start=2013-01-01&end=${
          new Date(dataFim.getFullYear(), dataFim.getMonth(), 31)
            .toISOString()
            .split("T")[0]
        }&skip=0&limit=1000`
      )
      .then((result) => {
        return result.data.process;
      });

    const filterData = processos
      .flatMap((item) => item.note_commitment)
      .filter((item) => item !== null);

    const noteCommitments = filterData.map((note) => {
      return {
        empenho: note.code_note,
        orgao: "",
        valor: parseFloat(note.value_note.$numberDecimal).toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ),
        status: note.status_note ? note.status_note.name : "",
        e: (
          <span onClick={(e) => deleteEmpenho(e, note._id)}>
            <BtnLink
              icon={<FaTrash />}
              size="sm"
              type="danger"
              exibe={true}
              title={""}
            />
          </span>
        ),
        d: (
          <span onClick={() => enviarDadosEditar(note._id)}>
            <BtnLink icon={<FaEdit />} size="sm" type="success" exibe={true} />
          </span>
        ),
        _id: note._id,
      };
    });

    setDataSet(noteCommitments);
    // console.log("🚀 ~ file: Empenhos.jsx:172 ~ fetcData ~ setDataSet:", setDataSet)
  };

  useEffect(() => {
    fetcData();
    // console.log("🚀 ~ file: Empenhos.jsx:177 ~ useEffect ~ fetcData:", fetcData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <>
      <ContainerGeral>
        <ContainerHeader
          title="Lista de Empenhos"
          exibeBtnList={false}
          exibeBtnAdd={false}
          handeclick={(e) => abriModal(e, "1")}
        />
        <ContainerPesquisa exibeDate={true} />
        <ContainerBody>
          <ContainerTable>
            <DataTable coll={col} ds={dataSet} />
          </ContainerTable>
        </ContainerBody>
      </ContainerGeral>
      <Modal show={showModal} size="lg">
        <ModalHeader>
          <ModalTitle>CADASTRAR EMPENHO</ModalTitle>
          <FaTimes onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalBody>
          <FormEmpenho data={{}} op={1} handleSubmit={refreshPage} />
        </ModalBody>
      </Modal>
      <Modal show={showModalEdit} size="lg">
        <ModalHeader>
          <ModalTitle>EDITAR EMPENHO</ModalTitle>
          <FaTimes onClick={() => setShowModalEdit(false)} />
        </ModalHeader>
        <ModalBody>
          <FormEmpenho data={empenho} op={2} handleSubmit={refreshPage} />
        </ModalBody>
      </Modal>
    </>
  );
}

export default Empenhos;
