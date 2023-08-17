import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { FaDatabase, FaTimes } from "react-icons/fa";
import GovernmentForm from "../../componentes/goverment/GovernmentForm";
import {
  ContainerBody,
  ContainerGeral,
  ContainerHeader,
  ContainerPesquisa,
  ContainerTable,
  DataTable,
  ProcessForm,
} from "../../services/index";
import { col, conditionalRowStyles } from "./TableConfig";
import { useProcess } from "./useProcess";

function Process() {
  const {
    showModal,
    closeModal,
    titleModal,
    openModal,
    createUpdateProcesso,
    editProcesso,
    dataSet,
    searchProcess,
    refresh,
    setShowModal,
    action,
    showModalEditGov,
    setShowModalEditGov,
    dateFim,
    dateInicio,
    openSpinner,
    setDateFim,
    setDateInit,
  } = useProcess();

  return (
    <>
      <Modal show={showModal} close={closeModal} fullscreen={true}>
        <ModalHeader style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <ModalTitle style={{ textTransform: "uppercase" }}>
            {titleModal}
          </ModalTitle>
          <FaTimes onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#f5f3f3" }}>
          <div className="container">
            <ProcessForm
              btnText="SALVAR"
              processData={action === "update" ? editProcesso : null}
              handleSubmit={createUpdateProcesso}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => setShowModal(false)}
          >
            Fechar
          </button>
        </ModalFooter>
      </Modal>
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
          <GovernmentForm></GovernmentForm>
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
      <ContainerGeral>
        <ContainerHeader
          handeclick={() => openModal("", "create")}
          title="Licitações Cadastradas"
          refresh={refresh}
          exibeBtnAdd={false}
          exibeBtnList={false}
          exibeBtn={true}
          exibeBtnLRefresh={false}
        />
        <ContainerPesquisa
          dateInicio={dateInicio}
          dateFim={dateFim}
          handleDateInit={(e) => setDateInit(e.target.value)}
          handleDateEnd={(e) => setDateFim(e.target.value)}
          handleChangeLocalizar={(e) => searchProcess(e)}
          exibeDate={false}
          isOpen={openSpinner}
        />
        <ContainerBody>
          <ContainerTable>
            {dataSet.length > 0 ? (
              <DataTable
                coll={col}
                ds={dataSet}
                titulo=""
                conditionalRowStyles={conditionalRowStyles}
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <FaDatabase className="text-9xl text-slate-400" />
              </div>
            )}
          </ContainerTable>
        </ContainerBody>
      </ContainerGeral>
    </>
  );
}
export default Process;
