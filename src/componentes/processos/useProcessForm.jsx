import { useState } from "react";
import useFetch from "../../hooks/UseFetch";

export const UseProcessForm = () => {
  const [org, setOrg] = useState(null);
  // console.log("redenrizou");
  async function getDataGovernment() {
    try {
      const response = await useFetch.get("processos?", {
        start: "1990-01-01",
        end: "2050-12-31",
        skip: 0,
        limit: 1000,
      });

      const dataset = response.data.process
        .flatMap((item) => item.government)
        .filter((item) => item !== null);
      const newGovernment = new Set();
      const filterGovernment = dataset.filter((government) => {
        const duplicatedPerson = newGovernment.has(government.cnpj);

        newGovernment.add(government.cnpj);
        return !duplicatedPerson;
      });

      setOrg(filterGovernment);
    } catch (error) {
      console.error(error);
    }
  }
  //console.log(org);
  return {
    getDataGovernment,
    org,
  };
};
