import { useState } from "react";
import uuid from "react-uuid";
import Swal from "sweetalert2";
import useFetch from "../../hooks/UseFetch";
import Proposta from "./Proposta";

const process = {
  process_data: { modality: "", portal: "", status: "", type_dispute: "" },
  government: [],
  notes: [],
  note_commitment: [],
  reference_term: {
    itens: [],
  },
};

export const UseProcessForm = (processData) => {
  const [org, setOrg] = useState(null);
  const [orgEdit, setOrgEdit] = useState([] || null);
  const [processo, setProcess] = useState(processData || process);
  const [empenho, setEmpenho] = useState({});
  const [item, setItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalAddGov, setShowModalAddGov] = useState(false);
  const [showModalEditGov, setShowModalEditGov] = useState(false);
  const [showModalEmpenho, setShowModalEmpenho] = useState(false);
  const [showModalItem, setShowModalItem] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notes, setNotes] = useState([]);
  const [titleEmpenho, setTitleEmpenho] = useState("");
  const [titleItem, setTitleItem] = useState("");
  const [actionEmpenho, setActionEmpenho] = useState(0);
  const [actionItem, setActionItem] = useState(0);

  //CODIGO RELACIONADO AOS DADOS DO ´ROGÃO
  //--------------------------------------------------------------
  async function getDataGovernment() {
    try {
      const response = await useFetch.get("processos?", {
        start: "1990-01-01",
        end: "2050-12-31",
        skip: 0,
        limit: 1000,
      });

      const dataset = response.data.process
        .flatMap((item) => item.government)
        .filter((item) => item !== null);
      const newGovernment = new Set();
      const filterGovernment = dataset.filter((government) => {
        const duplicatedPerson = newGovernment.has(government.cnpj);

        newGovernment.add(government.cnpj);
        return !duplicatedPerson;
      });

      setOrg(filterGovernment);
    } catch (error) {
      console.error(error);
    }
  }
  function getEditOrgao(codigo) {
    if (!codigo) {
      return;
    } else {
      const foundGov = processo.government.filter((data) =>
        data._id.includes(codigo)
      );
      setOrgEdit(foundGov[0]);
      setShowModalEditGov(true);
    }
  }
  function createOrgao(org) {
    org._id = uuid();
    const dados = {
      ...processo,
      process_data: {
        ...processo.process_data,
        code_bidding: org.code_government,
      },
      government: [...processo.government, org],
    };

    setProcess({
      ...processo,
      ...dados,
    });
    setShowModalAddGov(false);
  }
  async function editarOrgao(org) {
    const oldGovernment = processo.government.find(
      (item) => item._id === org._id
    );
    if (oldGovernment) {
      Object.assign(oldGovernment, { ...org });
    }
    setShowModalEditGov(false);
  }
  //CODIGO RELACIONADO A EMPENHO
  //--------------------------------------------------------------
  const createEmpenho = (empenho) => {
    empenho._id = uuid();
    const dados = {
      ...processo,
      note_commitment: [...processo.note_commitment, empenho],
    };
    setProcess({
      ...processo,
      ...dados,
    });
  };
  const updateEmpenho = (empenho) => {
    const foundEmpenho = processo.note_commitment.find(
      (note) => note._id === empenho._id
    );

    if (foundEmpenho) {
      Object.assign(foundEmpenho, { ...empenho });
    }
  };
  const createUpdateEmpenho = (data) => {
    if (actionEmpenho === 1) {
      createEmpenho(data);
    }
    if (actionEmpenho === 2) {
      updateEmpenho(data);
    }
    setShowModalEmpenho(false);
  };

  const deleteEmpenho = (e, value) => {
    e.preventDefault();
    const updatedNoteCommitment = processo.note_commitment.filter(
      (item) => item._id !== value
    );
    setProcess({
      ...processo,
      note_commitment: updatedNoteCommitment,
    });
  };

  function getEditEmpenho(codigo) {
    if (!codigo) {
      return;
    } else {
      const foundEmpenho = processo.note_commitment.filter((data) =>
        data._id.includes(codigo)
      );
      setEmpenho(foundEmpenho[0]);
    }
  }

  //CODIGO RELACIONADO AOS ITENS DA LICITAÇÃO
  //--------------------------------------------------------------
  function getDataItem(codigo) {
    if (!codigo) {
      return;
    } else {
      const foundItem = processo.reference_term.itens.filter((data) =>
        data._id.includes(codigo)
      );
      setItem(foundItem[0]);
    }
  }
  const createItem = (item) => {
    item._id = uuid();
    const dados = {
      ...processo,
      reference_term: {
        ...processo.reference_term,
        itens: [...processo.reference_term.itens, item],
      },
    };
    setProcess({
      ...processo,
      ...dados,
    });
  };
  const updateItem = (item) => {
    const foundItem = processo.reference_term.itens.find(
      (data) => data._id === item._id
    );

    if (foundItem) {
      Object.assign(foundItem, { ...item });
    }
  };
  const createUpdateItem = (data) => {
    if (actionItem === 1) {
      createItem(data);
    }
    if (actionItem === 2) {
      updateItem(data);
      setShowModalItem(false);
    }
  };
  const deleteItem = (codigo) => {
    const foundItem = processo.reference_term.itens.filter(
      (data) => data._id !== codigo
    );
    setProcess({
      ...processo,
      reference_term: {
        ...processo.reference_term,
        itens: foundItem,
      },
    });
  };
  const handleTermItem = (e) => {
    const dados = {
      ...processo,
      reference_term: {
        ...processo.reference_term,
        [e.target.name]: e.target.value,
      },
    };
    setProcess({
      ...processo,
      ...dados,
    });
  };
  function getDataItemList(data) {
    const value = data.manager === "false" ? "true" : data.manager;

    const dados = {
      process_data: {
        ...processo.process_data,
        code_bidding: data.code_government,
      },
      government: [
        {
          ...processo.government,
          _id: data._id,
          name: data.name,
          cnpj: data.cnpj,
          code_government: data.code_government,
          manager: value,
          address: data.address,
          contact: data.contact,
        },
      ],
    };
    setProcess({
      ...processo,
      ...dados,
    });
    setShowModal(false);
  }

  //CODIGO RELACIONADO AOS OUTRAS INFORMAÇÕES
  //--------------------------------------------------------------
  const getDadosGerais = (data) => {
    setProcess({
      ...processo,
      ...data,
    });
  };

  function enviarNotes() {
    const dados = {
      _id: uuid(),
      comments: notes,
      createdAt: new Date().toISOString().split("T")[0],
    };

    processo.notes.push(dados);
    setNotes("");
  }

  function handleNotes(e) {
    e.preventDefault();
    setNotes(e.target.value);
  }

  const gerarProposta = () => {
    const filterItens = processo.reference_term.itens.filter(
      (term) => (term.winner === true) | (term.winner === "true")
    );

    if (filterItens.length > 0) {
      if (
        processo.government.length <= 0 ||
        processo.process_data.length <= 0
      ) {
        Swal.fire("Proposta", "Informe os dados da licitação", "info");
      } else {
        Swal.fire("Proposta", "Proposta gerada com sucesso!", "success")
          .then()
          .finally(() => {
            Proposta.gerarProposta(processo);
          });
      }
    } else {
      Swal.fire("Proposta", "Não há itens arrematados", "info");
    }
  };

  const nameGovernment = processo.government
    .filter((data) => data.manager === "true")
    .map((item) => {
      return item.name;
    });
  //AREA DE FUNÇÃO DOS MODAL
  function fecharModal(e) {
    e.preventDefault();
    setShowModal(false);
  }

  const abrirModalEmpenho = (e, op, codigo) => {
    e.preventDefault();

    setActionEmpenho(op);
    if (op === 1) {
      setEmpenho({});
      setTitleEmpenho("Cadastrar empenho");
    } else {
      getEditEmpenho(codigo);
      setTitleEmpenho("Editar empenho");
    }

    setShowModalEmpenho(true);
  };

  const abrirModalItem = (op, codigo) => {
    setActionItem(op);
    if (op === 1) {
      setItem({});
      setTitleItem("NOVO ITEM");
    } else {
      getDataItem(codigo);
      setTitleItem("EDITAR ITEM");
    }

    setShowModalItem(true);
  };

  const abrirModalAddGov = (e) => {
    e.preventDefault();
    setShowModalAddGov(true);
    setOrgEdit({} || null);
  };

  return {
    processo,
    getDataGovernment,
    org,
    orgEdit,
    getEditOrgao,
    createOrgao,
    editarOrgao,
    empenho,
    createUpdateEmpenho,
    updateEmpenho,
    deleteEmpenho,
    getEditEmpenho,
    titleEmpenho,
    item,
    getDataItem,
    createUpdateItem,
    deleteItem,
    handleTermItem,
    getDataItemList,
    titleItem,
    getDadosGerais,
    gerarProposta,
    notes,
    handleNotes,
    enviarNotes,
    nameGovernment,
    refresh,
    showModal,
    showModalAddGov,
    showModalEditGov,
    showModalEmpenho,
    showModalItem,
    setShowModal,
    setShowModalAddGov,
    setShowModalEmpenho,
    setShowModalEditGov,
    setShowModalItem,
    setTitleEmpenho,
    setTitleItem,
    setActionEmpenho,
    setActionItem,
    setRefresh,
    fecharModal,
    abrirModalAddGov,
    abrirModalEmpenho,
    abrirModalItem,
  };
};
