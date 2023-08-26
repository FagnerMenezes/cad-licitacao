import { FormEmpenho, Item, ListSearch, Pagination } from "@/services/index";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useMemo } from "react";
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
import GovernmentForm from "../goverment/GovernmentForm";
import DadosGerais from "./DadosGerais";
import LinksProcesso from "./LinksProcesso";
import { UseProcessForm } from "./useProcessForm";

function ProcessForm({
  handleSubmit,
  processData,
  btnText,
  refresh = () => {},
}) {
  const {
    processo,
    getDataGovernment,
    org,
    orgEdit,
    getEditOrgao,
    createOrgao,
    editarOrgao,
    empenho,
    createUpdateEmpenho,
    deleteEmpenho,
    titleEmpenho,
    item,
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
    //refresh,
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
    fecharModal,
    abrirModalAddGov,
    abrirModalEmpenho,
    abrirModalItem,
    setRefresh,
  } = UseProcessForm(processData);

  useMemo(() => {
    getDataGovernment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e) => {
    e.preventDefault();
    try {
      handleSubmit(processo);
      refresh(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col rounded-md bg-white p-4 border">
      {processo.government.length > 0 ? (
        <div className="flex w-full  p-2  mb-2 border-b-[1px]">
          <span className="text-lg text-blue-800 uppercase font-bold">
            {nameGovernment}
          </span>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={submit}>
        <div className="flex flex-col p-2 gap-1 ">
          <Tabs
            defaultActiveKey="home"
            id="justify-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="home" title="Unidade gerenciadora" className="p-1">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label className="font-bold text-sm uppercase ">
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
                <div className={`flex flex-col`}>
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
                    <button className="border rounded-md flex justify-center items-center gap-2 outline-none bg-blue-600 hover:bg-blue-700 text-white p-2">
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
                                  <td>{item.status_note}</td>
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
          <div className="border-b-[1px] w-full mt-3 "></div>
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
          <Modal.Title style={{ textTransform: "uppercase", fontSize: "20px" }}>
            {titleEmpenho}
          </Modal.Title>
          <FaTimes onClick={() => setShowModalEmpenho(false)} />
        </Modal.Header>
        <Modal.Body>
          <FormEmpenho handleSubmitForm={createUpdateEmpenho} data={empenho} />
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
  refresh: PropTypes.func,
};
export default ProcessForm;
