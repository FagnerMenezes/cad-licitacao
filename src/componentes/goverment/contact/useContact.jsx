import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaContact, tipo_contato } from "./schema";
import { useEffect, useState } from "react";

export default function useContact(data) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaContact),
    defaultValues: data,
  });

  const [tipo, setTipo] = useState([]);

  useEffect(() => {
    setTipo(tipo_contato);
  }, []);

  return {
    handleSubmit,
    register,
    tipo,
    errors,
  };
}
