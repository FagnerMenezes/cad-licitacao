//import Form from "../componentes/orgao/OrgaoForm";
import api from "../../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ContainerGeral from "../../componentes/layout/ContainerGeral";
import ContainerHeader from "../../componentes/layout/ContainerHeader";
import ContainerBody from "../../componentes/layout/ContainerBody";

const NewOrg = () => {
  const history = useNavigate();

  function create(org) {
    api
      .post(`orgaos/create`, org)
      .then((response) => {
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
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            title: `Cadastro realizado com sucesso`,
          });
          history("/orgaos");
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.msg,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.msg,
          icon: "error",
        });
      });
  }

  return (
    <>
      <ContainerGeral>
        <ContainerHeader
          linkList="/government"
          title="Cadastrar novo órgão"
          exibeBtnAdd={false}
          exibeBtnLRefresh={false}
          exibeBtn={false}
        />
        <ContainerBody></ContainerBody>
      </ContainerGeral>
    </>
  );
};
export default NewOrg;
