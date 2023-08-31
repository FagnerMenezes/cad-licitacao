import api from "../api";

export const getDataServicesBec = async (oc) => {
  const { data } = await api
    .get(`bec/dados/${oc}`)
    .then((response) => response);
  return data;
};
