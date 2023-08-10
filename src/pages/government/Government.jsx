import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import DtTable from "../../componentes/form/DataTable";

import GovernmentForm from "../../componentes/goverment/GovernmentForm";
import useFetch from "../../hooks/UseFetch";
import {
  BtnLink,
  ContainerBody,
  ContainerGeral,
  ContainerHeader,
  ContainerPesquisa,
  ContainerTable,
} from "../../services/index";

const col = [
  { name: "Nome", sortable: true, selector: (row) => row.nome },
  { name: "CNPJ", sortable: true, selector: (row) => row.cnpj },
  { name: "UF", sortable: true, selector: (row) => row.uf },
  { name: "Cidade", sortable: true, selector: (row) => row.city },
  { name: "UASG", selector: (row) => row.code_government },
  { name: "", selector: (row) => row.e, maxwidth: "70px" },
  { name: "", selector: (row) => row.d, maxwidth: "70px" },
];

function Government() {
  const [showModal, setShowModal] = useState(false);
  const [editOrgao, setEditOrgao] = useState([]);
  const [data_set, setDataSet] = useState([]);
  const [dataSetEdit, setDataSetEdit] = useState([]);

  useEffect(() => {
    (async () => {
      const process = await useFetch.getDataGovernment();
      const government = process
        .flatMap((item) => item.government)
        .filter((item) => item !== null);

      const newGovernment = new Set();
      const filterGovernment = government.filter((government) => {
        const duplicatedPerson = newGovernment.has(government.cnpj);
        newGovernment.add(government.cnpj);
        return !duplicatedPerson;
      });
      setDataSetEdit(filterGovernment);
      const data_set = await filterGovernment.map((data) => {
        return {
          nome: data.name,
          cnpj: data.cnpj,
          uf: data.address[0].uf,
          city: data.address[0].city,
          code_government: data.code_government,
          e: (
            <span onClick={(e) => e}>
              <BtnLink
                icon={<FaTrash />}
                size="sm"
                type="danger"
                to={""}
                exibe={true}
              />
            </span>
          ),
          d: (
            <span onClick={(e) => openModal(data._id)}>
              <BtnLink
                icon={<FaEdit />}
                size="sm"
                type="success"
                to={""}
                exibe={true}
              />
            </span>
          ),
        };
      });
      //console.log(data_set);
      setDataSet(data_set);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openModal(code) {
    const findGovernment = dataSetEdit.filter((data) =>
      data._id.includes(code)
    );
    setEditOrgao(findGovernment[0]);
    setShowModal(true);
    //console.log(findGovernment[0]);
  }

  return (
    <>
      <Modal
        show={showModal}
        cancel={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Editar</Modal.Title>
          <FaTimes onClick={(e) => setShowModal(false)} />
        </Modal.Header>
        <Modal.Body>
          <GovernmentForm orgData={editOrgao} btnText="Editar" />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <ContainerGeral>
        <ContainerHeader
          link="/newgovernment"
          title="Órgãos públicos"
          exibeBtnLRefresh={true}
          exibeBtnList={false}
          exibeBtn={false}
        />
        <ContainerPesquisa handleChangeLocalizar={""} />
        <ContainerBody>
          <ContainerTable>
            <DtTable coll={col} ds={data_set} />
          </ContainerTable>
        </ContainerBody>
      </ContainerGeral>
    </>
  );
}

export default Government;
