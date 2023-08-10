import * as yup from "yup";

export const schemaAddress = yup.object({
  type_address: yup.string().required("Campo TIPO ENDEREÇO é  obrigatório"),
  uf: yup.string(),
  city: yup.string().required("Campo cidade é  obrigatório "),
  district: yup.string().required("Campo bairro é  obrigatório"),
  number: yup.string(),
  street: yup.string().required("Campo rua é  obrigatório "),
  zip_code: yup.string().max(8, "Maxímo 8 numeros"),
  complement: yup.string(),
});

export const type_address = [
  { id: "RESIDENCIAL", name: "RESIDENCIAL" },
  { id: "ENTREGA", name: "ENTREGA" },
  { id: "FATURAMENTO", name: "FATURAMENTO" },
  { id: "DIRETORIA", name: "DIRETORIA" },
  { id: "LICITAÇÃO", name: "LICITAÇÃO" },
  { id: "COMPRAS", name: "COMPRAS" },
];
