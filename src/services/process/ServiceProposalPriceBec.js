import api from "../api";

export const RegisterProposalPriceBec = async ({ data }) => {
  const response = await api
    .post("bec/register-proposal", data)
    .then((response) => {
      //console.log(response);
      return response;
    })
    .catch((err) => err);
  return response;
};
