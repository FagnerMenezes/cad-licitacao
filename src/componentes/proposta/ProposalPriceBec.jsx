import Swal from "sweetalert2";
import { RegisterProposalPriceBec } from "../../services/process/ServiceProposalPriceBec";

export const ProposalPriceBec = async (dataProcess) => {
  if (dataProcess.process_data.portal !== "BEC") return;
  const itens = [];
  dataProcess.reference_term.itens.map((item) => {
    const item_data = {
      numero: item.cod,
      grupoLote: item.lote,
      descricao: item.description,
      unidade: item.unit,
      valorUnitario: parseFloat(item.unitary_value.$numberDecimal),
      quantidade: item.amount,
      marca: item.brand + " - " + item.model,
      fornecedor: item.brand,
      embalagem: "",
      registro: "",
      procedencia: item.origination,
      tipo: "",
    };
    itens.push(item_data);
  });

  const uasg = dataProcess.government.filter((item) =>
    item.manager.includes("true")
  );

  const data = {
    empresa: 1,
    uasgNome: uasg[0].name,
    dataInicial: dataProcess.process_data.date_init,
    dataFinal: dataProcess.process_data.date_finish,
    oc: dataProcess.process_data.bidding_notice,
    itens,
  };
  //console.log(data);
  const response = await RegisterProposalPriceBec({ data });
  if (response.status === 200) {
    // console.log(response.data);
    Swal.fire({
      title: "OK",
      text: "Proposta cadastrada com sucesso",
      icon: "success",
    });
  } else {
    Swal.fire({ title: "ERROR", text: response.statusText, icon: "success" });
  }
};
