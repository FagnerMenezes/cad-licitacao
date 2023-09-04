import { RegisterProposalPriceBec } from "../../services/process/ServiceProposalPriceBec";

export const ProposalPriceBec = async (dataProcess) => {
  const itens = [];
  dataProcess.reference_term.itens.map((item) => {
    const item_data = {
      numero: item.cod,
      grupoLote: "",
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
  await RegisterProposalPriceBec(data);
};
