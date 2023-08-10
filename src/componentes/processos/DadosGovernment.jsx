import { FaRegBuilding, FaSearch, FaTimes } from "react-icons/fa";
import styles from "./ProcessoForm.module.css";
import { FaEye, FaPlus } from "react-icons/fa";
import InputFloat from "../form/InputFloat";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ListSearch from "../layout/ListSearch";
import { FormOrgao } from "../../services";
import uuid from "react-uuid";
import useFetch from "../../hooks/UseFetch";

const DadosGovernment = (process, getDadosGovernment) => {
  const [showModalAddGov, setShowModalAddGov] = useState(false);
  const [showModalEditGov, setShowModalEditGov] = useState(false);
  const [orgEdit, setOrgEdit] = useState([] || null);
  const [showModal, setShowModal] = useState(false);
  const [processo, setProcesso] = useState(process.data || {});
  const [org, setOrg] = useState([] || null);

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

  function fecharModal(e) {
    e.preventDefault();
    setShowModal(false);
  }

  function localizarOrgao(data) {
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

  const createOrgao = (org) => {
    org._id = uuid();
    const dados = {
      ...processo,
      process_data: {
        ...processo.process_data,
        code_bidding: org.code_government,
      },
      government: [...processo.government, org],
    };

    setProcesso({
      ...processo,
      ...dados,
    });
    // console.log(org);

    setShowModalAddGov(false);
  };

  return (
    <>
      {/**UNIDADE GERENCIADORA */}
      <div className="col-md-12">
        <fieldset className="container border rounded">
          <details open={true}>
            <summary className={`${styles.sumary}`}>
              <p className="text-uppercase">
                <span>
                  <FaRegBuilding />
                </span>
                <strong> Unidade Gerenciadora</strong>
              </p>
            </summary>
            <div className="col-md-12 ">
              <div className={`input-group ${styles.container_process_uasg}`}>
                <input
                  className="form-control "
                  type="text"
                  text="Unidade Gerenciadora "
                  name="name"
                  placeholder="Informe o nome do órgão"
                  value={
                    processo.government.length > 0
                      ? processo.government[0].name
                      : null
                  }
                  required="required"
                  readOnly={true}
                />
                {processo.government.length > 0 ? (
                  <span
                    className="input-group-text"
                    data-toogle="tooltip"
                    title="visualizar unidade gerenciadora"
                  >
                    <FaEye
                      onClick={(e) =>
                        getEditOrgao(
                          processo.government.length > 0
                            ? processo.government[0]._id
                            : null
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
                  className="input-group-text"
                  data-toogle="tooltip"
                  title="Cadastrar unidade gerenciadora"
                >
                  <FaPlus onClick={(e) => setShowModalAddGov(true)} />
                </span>
              </div>
            </div>
            <div className={`col-md-4`}>
              <InputFloat
                type="text"
                text="Nº da UASG/UGE/COD"
                name="code_bidding"
                placeholder="Informe o nº do uasg/oc"
                required="required"
                readOnly
                value={
                  processo.government.length > 0
                    ? processo.government[0].code_government
                    : ""
                }
              />
            </div>
            <br />
          </details>
        </fieldset>
      </div>

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
          <Modal.Title id="contained-modal-title-vcenter">
            Editar órgão público
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalEditGov(false)} />
        </Modal.Header>
        <Modal.Body>
          <FormOrgao
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
          <Modal.Title id="contained-modal-title-vcenter">
            Localizar...
          </Modal.Title>
          <FaTimes onClick={fecharModal} />
        </Modal.Header>
        <Modal.Body>
          <ListSearch
            list={org}
            handleDoubleClick={localizarOrgao}
            fildset="name"
          />
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
          <Modal.Title id="contained-modal-title-vcenter">
            Cadastrar órgão público
          </Modal.Title>
          <FaTimes onClick={(e) => setShowModalAddGov(false)} />
        </Modal.Header>
        <Modal.Body>
          <FormOrgao btnText="Enviar" handleSubmit={createOrgao} />
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
    </>
  );
};

export default DadosGovernment;

// processo.government
//                       .filter((data) => data.manager === "true")
//                       .map((item) => {
//                         return item.name;
//                       })

// processo.government
// .filter((data) => data.manager === "true")
// .map((item) => {
//   return item._id;
// })

// processo.government
//                     .filter((data) => data.manager === "true")
//                     .map((item) => {
//                       return item.code_government;
//                     })
