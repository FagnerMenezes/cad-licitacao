import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ProcessForm from "../../componentes/processos/ProcessForm";
import Swal from "sweetalert2";
import ContainerGeral from "../../componentes/layout/ContainerGeral";
import ContainerHeader from "../../componentes/layout/ContainerHeader";
import ContainerBody from "../../componentes/layout/ContainerBody";
import axios from "axios";

function NewProcesso() {
  const history = useNavigate();

  function create(processo) {
    // console.log(processo);
    // fetch(`https://apilicitacao.herokuapp.com/processos/create`, {
    //   method: "POST",
    //   body: processo,
    //   headers: { "Content-type": "application/json; charset=UTF-8" },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // const data = {
    //   processo,
    // };
    axios
      .post(`https://apilicitacao.herokuapp.com/processos/create`, processo)
      .then((response) => console.log(response.data));
    // api
    //   .post(`processos/create`, processo)
    //   .then((response) => {
    //     // console.log(response);
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: "top-end",
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       didOpen: (toast) => {
    //         toast.addEventListener("mouseenter", Swal.stopTimer);
    //         toast.addEventListener("mouseleave", Swal.resumeTimer);
    //       },
    //     });
    //     Toast.fire({
    //       icon: "success",
    //       title: "Cadastro realizado com sucesso.",
    //     });
    //     history("/processos");
    //   })
    //   .catch((err) => console.log(err));
  }

  return (
    <ContainerGeral>
      <ContainerHeader
        linkList="/processos"
        title="Cadastrar novo processo"
        exibeBtnAdd={false}
        exibeBtnLRefresh={false}
        exibeBtn={false}
      />
      <ContainerBody>
        <ProcessForm btnText="Salvar" handleSubmit={create} />
      </ContainerBody>
    </ContainerGeral>
  );
}

export default NewProcesso;
