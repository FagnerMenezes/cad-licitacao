import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddress } from "./schema";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import axios from "axios";

export const useAddress = ({ endData }) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAddress),
    defaultValues: endData,
  });
  const cep = watch("zip_code");
  const searchCEP = useCallback(
    async (zipCode) => {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      setValue("street", data.logradouro);
      setValue("district", data.bairro);
      setValue("city", data.localidade);
      setValue("uf.id", String(data.ibge).substring(0, 2));
      setValue("complement", data.complemento);
    },
    [setValue]
  );

  function buscarcep() {
    if (cep?.length !== 8) return;
    searchCEP(cep);
  }
  return {
    handleSubmit,
    register,
    buscarcep,
    errors,
  };
};
