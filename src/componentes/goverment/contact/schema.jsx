import * as yup from "yup";

export const schemaContact = yup.object({
  name: yup.string("Campo nome obrigatório").required("Campo nome obrigatório"),
  tipo: yup.string("Campo tipo obrigatório").required("Campo tipo obrigatório"),
  contact: yup
    .string("Campo contato obrigatório")
    .required("Campo contato obrigatório"),
});

export const tipo_contato = [
  { id: "Tel", name: "Tel" },
  { id: "Email", name: "Email" },
  { id: "Whastap", name: "Whastapp" },
];
