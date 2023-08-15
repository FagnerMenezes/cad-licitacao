import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
import InputFloat from "../form/InputFloat";
import SubmitButton from "../form/SubmitButton";

import { FormEmpenho, Item, ListSearch, Pagination } from "@/services/index";
import uuid from "react-uuid";
import Swal from "sweetalert2";
import GovernmentForm from "../goverment/GovernmentForm";
import DadosGerais from "./DadosGerais";
import LinksProcesso from "./LinksProcesso";
import Proposta from "./Proposta";
import { UseProcessForm } from "./useProcessForm";

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
  const { getDataGovernment, org } = UseProcessForm();
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

  useEffect(() => {
    getDataGovernment();
  }, [refresh]);

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
    try {
      handleSubmit(processo);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
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
                  <label className="font-bold text-sm uppercase">
                    Unidade gerenciadora
                  </label>
                  <div className="input-group mb-3">
                    <input
                      className="form-control "
                      type="text"
                      name="name"
                      placeholder="Informe o nome do órgão"
                      value={
                        processo != null
                          ? processo.government
                              .filter((data) => data.manager === "true")
                              .map((item) => {
                                return item.name;
                              })
                          : {}
                      }
                      required="required"
                      readOnly={true}
                    />

                    {processo != null &&
                    processo.government.length > 0 &&
                    processo.government[0]._id ? (
                      <span
                        className="input-group-text"
                        data-toogle="tooltip"
                        title="visualizar unidade gerenciadora"
                      >
                        <FaEye
                          onClick={() =>
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
                      <FaSearch onClick={() => setShowModal(true)} />
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
                  <label className="form-control-label uppercase font-bold text-sm">
                    Nº da UASG/COD/UGE
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="code_bidding"
                    placeholder="Informe o nº do uasg/oc"
                    required="required"
                    readOnly
                    value={
                      processo != null &&
                      processo.government
                        .filter((data) => data.manager === "true")
                        .map((item) => {
                          return item.code_government;
                        })
                    }
                  />
                </div>
                <dl className="flex flex-col gap-1 mt-2">
                  {processo != null &&
                    processo.government
                      .filter((data) => data.manager === "true")
                      .map((item) => (
                        <>
                          <dt>CNPJ</dt>
                          <dd>
                            {String(item.cnpj).replace(
                              /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                              "$1.$2.$3/$4-$5"
                            )}
                          </dd>
                          <dt>CONTATO</dt>
                          <dd>{item.contact[0].tipo}</dd>
                          <dd>{item.contact[0].name}</dd>
                          <dd>{item.contact[0].contact}</dd>
                          <dt>ENDEREÇO</dt>
                          <dd>{item.address[0].type_address}</dd>
                          <dd>
                            {item.address[0].street}-{item.address[0].number}
                          </dd>
                          <dd>{item.address[0].district}</dd>
                          <dd>{item.address[0].city}</dd>
                          <dd>{item.address[0].uf}</dd>
                        </>
                      ))}
                </dl>
              </div>
            </Tab>
            <Tab eventKey="dados" title="Dados gerais">
              <br />
              <DadosGerais getDados={getDadosGerais} data={processo} />
            </Tab>
            <Tab eventKey="termo" title="Termo">
              <div className="row">
                <div className="col-sm-4">
                  <InputFloat
                    text="Prazo entrega"
                    name="deadline"
                    type="text"
                    placeholder={"Prazo de entrega"}
                    value={
                      processo != null && processo.reference_term
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
                      processo !== null && processo.reference_term
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
                      processo != null && processo.reference_term
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
                    className="text-justify text-sm w-full border rounded-md outline-none h-full p-1 "
                    name="comments"
                    onChange={(e) => handleTermItem(e)}
                  >
                    {(processo != null && processo.reference_term?.comments) ||
                      `Declaramos que estamos de pleno acordo com todas as condições estabelecidas no Edital e seus Anexos. Declaramos que os produtos a serem entregues serão novos e nunca antes utilizados. Declaramos que nos preços cotados estão incluídas todas as despesas que, direta ou indiretamente, fazem parte do presente objeto`}
                  </textarea>
                </div>
              </div>

              <br />
              <div className="col-md-12">
                <div className="flex gap-3 items-center p-1">
                  <button
                    type="button"
                    className="flex items-center border-2 outline-offset-1 border-indigo-600 text-indigo-600 rounded-lg p-2 outline-1 outline-indigo-600 gap-2 hover:bg-indigo-600 hover:text-white"
                    onClick={() => abrirModalItem(1, "")}
                  >
                    <FaPlus /> Novo Item
                  </button>{" "}
                  <button
                    className="flex items-center border-2 border-emerald-600 text-emerald-600 rounded-lg p-2 outline-1 outline-emerald-600 outline-offset-1 gap-2 hover:bg-emerald-600 hover:text-white"
                    type="button"
                    onClick={(e) => gerarProposta(e)}
                  >
                    <FaPrint /> Impressão da proposta
                  </button>
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                {processo != null &&
                  processo.reference_term?.itens &&
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
                  {processo != null && processo.note_commitment && (
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
                          {processo != null &&
                            processo.note_commitment.map((item) => (
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
                                      onClick={(e) =>
                                        deleteEmpenho(e, item._id)
                                      }
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
                          {processo != null &&
                            processo.note_commitment.length > 0 &&
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
                  {processo != null && processo.notes && (
                    <ul>
                      {processo != null &&
                        processo.notes.map((item) => (
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
                edital={
                  processo != null && processo.process_data.bidding_notice
                }
                uasg={
                  processo != null &&
                  processo.government
                    .filter(
                      (data) => data.manager === "true" || data.manager === true
                    )
                    .map((item) => {
                      return item.code_government;
                    })
                }
                portal={processo != null && processo.process_data.portal}
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
                  {processo != null &&
                    processo.government
                      .filter((org) => org.manager?.includes("false"))
                      .map((item) => {
                        return (
                          <tr key={item._id}>
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
          <br />
          <div className="border-b-2 w-full "></div>
          <div className="flex w-full mt-2">
            <SubmitButton text={btnText} />
          </div>
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
          <FaTimes onClick={() => setShowModalEditGov(false)} />
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
            onClick={() => setShowModalEditGov(false)}
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
          <FaTimes onClick={() => setShowModalAddGov(false)} />
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
            onClick={() => setShowModalAddGov(false)}
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
          <FaTimes onClick={() => setShowModalEmpenho(false)} />
        </Modal.Header>
        <Modal.Body>
          <FormEmpenho handleSubmit={createUpdateEmpenho} data={empenho} />
        </Modal.Body>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => setShowModalEmpenho(false)}
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
          <FaTimes onClick={() => setShowModalItem(false)} />
        </Modal.Header>

        <ModalBody>
          <Item data={item || {}} handleSubmitForm={createUpdateItem} />
        </ModalBody>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => setShowModalItem(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
ProcessForm.propTypes = {
  handleSubmit: PropTypes.func,
  processData: PropTypes.array,
  btnText: PropTypes.string,
};
export default ProcessForm;
