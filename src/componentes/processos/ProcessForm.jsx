import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Modal, ModalBody, ModalFooter, Tab, Tabs } from "react-bootstrap";
import {
  FaCloudDownloadAlt,
  FaComments,
  FaEdit,
  FaEye,
  FaPlus,
  FaPrint,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import api from "../../services/api";
import InputFloat from "../form/InputFloat";
import SubmitButton from "../form/SubmitButton";

import uuid from "react-uuid";
import Swal from "sweetalert2";
import useFetch from "../../hooks/UseFetch";
import {
  FormEmpenho,
  Item,
  ListSearch,
  Pagination,
} from "../../services/index";
import GovernmentForm from "../goverment/GovernmentForm";
import DadosGerais from "./DadosGerais";
import LinksProcesso from "./LinksProcesso";
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

function ProcessForm({ handleSubmit, processData, btnText }) {
  const [org, setOrg] = useState([] || null);
  const [orgEdit, setOrgEdit] = useState([] || null);
  const [processo, setProcess] = useState(processData || process);
  const [empenho, setEmpenho] = useState({});
  const [item, setItem] = useState({});
  const [modalidades, setModalidades] = useState([]);
  const [portais, setPortais] = useState([]);
  const [tipoDisputas, setTipoDisputas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAddGov, setShowModalAddGov] = useState(false);
  const [showModalEditGov, setShowModalEditGov] = useState(false);
  const [showModalEmpenho, setShowModalEmpenho] = useState(false);
  const [showModalItem, setShowModalItem] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notes, setNotes] = useState([]);
  const [statusProc, setStatusProc] = useState([]);
  const [modalConfig, setModalConfig] = useState(false);
  // const [titleModalConfig, settitleModalConfig] = useState("");
  const [titleEmpenho, setTitleEmpenho] = useState("");
  const [titleItem, setTitleItem] = useState("");
  const [actionEmpenho, setActionEmpenho] = useState(0);
  const [actionItem, setActionItem] = useState(0);
  //const [proposta, setProposta] = useState({} || null);

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
  useEffect(() => {
    getDataGovernment();
  }, [refresh]);
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
  }, []);

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

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(processo);
  };

  function enviarNotes(e) {
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

  function fecharModal(e) {
    e.preventDefault();
    setShowModal(false);
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

  // function abrirModalConfig(e, mongoCollection, title) {
  //   e.preventDefault();
  //   setModalConfig(true);
  //   settitleModalConfig(title);
  //   setRefresh(false);
  // }

  //DADOS EMPENHOS DO PROCESSO
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

  //DADOS ITENS DO PROCESSO

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

  const getDadosGerais = (data) => {
    setProcess({
      ...processo,
      ...data,
    });
  };

  const abrirModalAddGov = (e) => {
    e.preventDefault();
    setShowModalAddGov(true);
    setOrgEdit({} || null);
  };

  const gerarProposta = (e) => {
    e.preventDefault();
    const winner = processo.reference_term.itens.filter(
      (term) => term.winner === "true"
    );

    if (winner.length > 0) {
      Proposta.gerarProposta(processo);
    } else {
      Swal.fire("Proposta", "Não há itens arrematados", "info");
    }
  };

  return (
    <div
      className="container rounded"
      style={{ backgroundColor: "white", padding: "10px" }}
    >
      <form onSubmit={submit}>
        <div className="container rounded">
          <Tabs
            defaultActiveKey="home"
            id="justify-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Unidade gerenciadora">
              <br />
              <div className="row">
                <div className="col-md-12 ">
                  <div className="input-group mb-3">
                    <input
                      className="form-control "
                      type="text"
                      text="Unidade Gerenciadora "
                      name="name"
                      placeholder="Informe o nome do órgão"
                      value={processo.government
                        .filter((data) => data.manager === "true")
                        .map((item) => {
                          return item.name;
                        })}
                      required="required"
                      readOnly={true}
                    />

                    {processo.government.length > 0 &&
                    processo.government[0]._id ? (
                      <span
                        className="input-group-text"
                        data-toogle="tooltip"
                        title="visualizar unidade gerenciadora"
                      >
                        <FaEye
                          onClick={(e) =>
                            getEditOrgao(
                              processo.government
                                .filter((data) => data.manager === "true")
                                .map((item) => {
                                  return item._id;
                                })
                            )
                          }
                        />
                      </span>
                    ) : (
                      ""
                    )}

                    <span
                      className="input-group-text"
                      data-toogle="tooltip"
                      title="Localizar unidade gerenciadora"
                    >
                      <FaSearch onClick={(e) => setShowModal(true)} />
                    </span>

                    <span
                      className="input-group-text "
                      data-toogle="tooltip"
                      title="Cadastrar unidade gerenciadora"
                    >
                      <FaPlus onClick={(e) => abrirModalAddGov(e)} />
                    </span>
                  </div>
                </div>
                <div className={`col-md-4`}>
                  <label className="form-control-label">
                    <strong>Nº da UASG/COD/UGE</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="code_bidding"
                    placeholder="Informe o nº do uasg/oc"
                    required="required"
                    readOnly
                    value={processo.government
                      .filter((data) => data.manager === "true")
                      .map((item) => {
                        return item.code_government;
                      })}
                  />
                </div>
              </div>
            </Tab>
            <Tab eventKey="dados" title="Dados gerais">
              <br />
              <DadosGerais getDados={getDadosGerais} data={processo} />
            </Tab>
            <Tab eventKey="termo" title="Termo">
              <br />

              <div className="row">
                <div className="col-sm-4">
                  <InputFloat
                    text="Prazo entrega"
                    name="deadline"
                    type="text"
                    placeholder={"Prazo de entrega"}
                    value={
                      processo.reference_term
                        ? processo.reference_term.deadline
                        : ""
                    }
                    handleOnChange={(e) => handleTermItem(e)}
                  />
                  <InputFloat
                    text="Garantia"
                    name="guarantee"
                    type="text"
                    placeholder={"Garantia"}
                    value={
                      processo.reference_term
                        ? processo.reference_term.guarantee
                        : ""
                    }
                    handleOnChange={(e) => handleTermItem(e)}
                  />
                  <InputFloat
                    text="Validade da proposta"
                    name="validity"
                    type="text"
                    placeholder={"Validade"}
                    value={
                      processo.reference_term
                        ? processo.reference_term.validity
                        : ""
                    }
                    handleOnChange={(e) => handleTermItem(e)}
                  />
                </div>

                <div className="col-sm-8">
                  <p>
                    <label
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#444646",
                      }}
                    >
                      Observação
                    </label>
                  </p>
                  <textarea
                    style={{
                      width: "100%",
                      outline: "none",
                      border: "1px solid #3951b2",
                      borderRadius: "5px",
                      color: "blue",
                      height: "70%",
                    }}
                    name="comments"
                    onChange={(e) => handleTermItem(e)}
                  >
                    {processo.reference_term.comments ||
                      `Declaramos que estamos de pleno acordo com todas as condições estabelecidas no Edital e seus Anexos.
                       Declaramos que os produtos a serem entregues serão novos e nunca antes utilizados. 
                       Declaramos que nos preços cotados estão incluídas todas as despesas que, direta ou indiretamente, fazem parte do presente objeto`}
                  </textarea>
                </div>
              </div>

              <br />
              <div className="col-md-12">
                <div className="col-sm-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => abrirModalItem(1, "")}
                  >
                    <FaPlus /> Novo Item
                  </button>{" "}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    style={{ width: "190px" }}
                    type="button"
                    onClick={(e) => gerarProposta(e)}
                  >
                    <FaPrint /> Impressão da proposta
                  </button>
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                {processo.reference_term.itens &&
                  (processo.reference_term.itens.length > 0 ? (
                    <>
                      <br />
                      <Pagination
                        items={processo.reference_term.itens}
                        itemsPerPage={5}
                        handleDeleteItem={deleteItem}
                        handleEditItem={abrirModalItem}
                      />
                    </>
                  ) : (
                    <tr>
                      <td>Não há itens para exibir</td>
                    </tr>
                  ))}
              </div>
              <br />
            </Tab>
            <Tab eventKey="empenho" title="Empenhos">
              <br />
              <div className="container">
                <div className="row">
                  <span onClick={(e) => abrirModalEmpenho(e, 1)}>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      style={{ width: "100px" }}
                    >
                      {<FaPlus />} Novo
                    </button>
                  </span>
                </div>
                <br />
                <div className="row">
                  {processo.note_commitment && (
                    <>
                      <table className="table table-sm table-striped">
                        <thead>
                          <tr className="bg-primary" style={{ color: "white" }}>
                            <th hidden>ID</th>
                            <th>Nº empenho</th>
                            <th>Valor R$</th>
                            <th>Status</th>
                            <th>Anexo</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {processo.note_commitment.map((item, i) => (
                            <>
                              <tr key={item._id} style={{ fontSize: "12px" }}>
                                <td hidden>{item._id}</td>
                                <td>{item.code_note}</td>
                                <td>
                                  {parseFloat(
                                    item.value_note.$numberDecimal
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </td>
                                <td>{item.status_note.name}</td>
                                <td>
                                  <a
                                    href={item.attachment}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <FaCloudDownloadAlt />
                                  </a>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={(e) =>
                                      abrirModalEmpenho(e, 2, item._id)
                                    }
                                  >
                                    <FaEdit />
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={(e) => deleteEmpenho(e, item._id)}
                                  >
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "10px",
                        }}
                      >
                        <strong>Total geral:</strong>
                        <div style={{ color: "blue", fontWeight: "bolder" }}>
                          {processo.note_commitment.length > 0 &&
                            processo.note_commitment
                              .map((item) =>
                                parseFloat(item.value_note.$numberDecimal)
                              )
                              .reduce(
                                (accumulator, currentValue) =>
                                  accumulator + currentValue
                              )
                              .toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <br />
            </Tab>
            <Tab eventKey="Anotacoes" title="Anotações">
              <div className="container">
                <div className="row">
                  {processo.notes && (
                    <ul>
                      {processo.notes.map((item, i) => (
                        <>
                          <li>
                            {item.comments} :{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                          </li>
                        </>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="escreva uma anotação"
                      onChange={handleNotes}
                      value={notes || ""}
                    />
                  </div>

                  <div className="col-md-2">
                    <FaComments onClick={enviarNotes} />
                  </div>
                </div>
                <br />
              </div>
            </Tab>
            <Tab eventKey="Links" title="Links">
              <LinksProcesso
                edital={processo.process_data.bidding_notice}
                uasg={processo.government
                  .filter((data) => data.manager === "true")
                  .map((item) => {
                    return item.code_government;
                  })}
                portal={processo.process_data.portal.name}
              />
            </Tab>
            <Tab eventKey="uasg_participantes" title="Uasg participantes">
              <table className="table table-sm table-striped">
                <thead>
                  <tr className="bg-primary" style={{ color: "white" }}>
                    <th>Órgão</th>
                    <th>CNPJ</th>
                    <th>Uasg</th>
                  </tr>
                </thead>
                <tbody>
                  {processo.government
                    .filter((org) => org.manager?.includes("false"))
                    .map((item) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.cnpj}</td>
                          <td>{item.code_government}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </div>

        <br />
        <div className="flex w-full">
          <SubmitButton text={btnText} />
        </div>
      </form>

      {/**AREA DE MODAL */}
      {/**######################### */}
      {/*MODAL EDITAR ORGÃO */}
      <Modal
        show={showModalEditGov}
        cancel={showModalEditGov}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textTransform: "uppercase" }}
          >
            Editar órgão público
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalEditGov(false)} />
        </Modal.Header>
        <Modal.Body>
          <GovernmentForm
            btnText="Enviar"
            handleSubmit={editarOrgao}
            orgData={orgEdit}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalEditGov(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
      {/**MODAL LOCALIZAR ÓRGÃO */}
      <Modal
        show={showModal}
        cancel={showModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textTransform: "uppercase" }}
          >
            Localizar
          </Modal.Title>
          <FaTimes onClick={fecharModal} />
        </Modal.Header>
        <Modal.Body>
          <ListSearch list={org} dataList={getDataItemList} fieldset="name" />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={fecharModal}>
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
      {/**MODAL CADASTRAR ÓRGÃO */}
      <Modal
        show={showModalAddGov}
        cancel={showModalAddGov}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textTransform: "uppercase" }}
          >
            Cadastrar órgão público
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalAddGov(false)} />
        </Modal.Header>
        <Modal.Body>
          <GovernmentForm
            btnText="Enviar"
            handleSubmit={createOrgao}
            orgData={""}
          />
          {/* <FormOrgao btnText="Enviar" handleSubmit={createOrgao} orgData={""} /> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalAddGov(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
      {/**MODAL EMPENHO */}
      <Modal show={showModalEmpenho} size="sm">
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title style={{ textTransform: "uppercase" }}>
            {titleEmpenho}
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalEmpenho(false)} />
        </Modal.Header>
        <Modal.Body>
          <FormEmpenho handleSubmit={createUpdateEmpenho} data={empenho} />
        </Modal.Body>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalEmpenho(false)}
          >
            Fechar
          </button>
        </ModalFooter>
      </Modal>
      {/**MODAL ITEM */}
      <Modal
        show={showModalItem}
        size={"md"}
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <Modal.Title style={{ textTransform: "uppercase" }}>
            {titleItem}
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalItem(false)} />
        </Modal.Header>

        <ModalBody>
          <Item data={item || {}} handleSubmit={createUpdateItem} />
        </ModalBody>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={(e) => setShowModalItem(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProcessForm;
