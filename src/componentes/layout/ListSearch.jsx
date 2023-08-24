import PropTypes from "prop-types";
import { useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import Swal from "sweetalert2";

const ItemList = styled.li`
  list-style: none;
  margin-top: 3px;
  font-size: 12px;
  text-transform: uppercase;
  padding: 5px;
  &:hover {
    background-color: #568df7;
    color: white;
    cursor: pointer;
  }
`;

const ListSearch = ({ list, dataList, fieldset }) => {
  const [value, setValue] = useState("");
  const [dataGoverment, setDataGovernment] = useState("");
  const governmentList = list;

  function selectListItem(data) {
    dataList(data);
  }

  const searchCnpj = async (e, cnpj) => {
    try {
      if (e.key === "Enter") {
        await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`)
          .then((response) => response.json())
          .then((response) => {
            //console.log(response);
            if (response.status === 400) {
              Swal.fire({
                title: "Error",
                text: response.detalhes,
                icon: "error",
              });
            } else {
              const government = {
                _id: uuid(),
                name: response.razao_social,
                cnpj: response.estabelecimento.cnpj,
                code_government: "0001",
                manager: "true",
                address: [
                  {
                    city: response.estabelecimento.cidade.nome,
                    complement: response.estabelecimento.complemento,
                    district: response.estabelecimento.bairro,
                    number: response.estabelecimento.numero,
                    street:
                      response.estabelecimento.tipo_logradouro +
                      " " +
                      response.estabelecimento.logradouro,
                    type_address: "DIRETORIA",
                    zip_code: response.estabelecimento.cep,
                    uf: response.estabelecimento.estado.sigla,
                    _id: uuid(),
                  },
                ],
                contact: [
                  {
                    contact: response.estabelecimento.telefone1,
                    name: "COMPRAS",
                    sector: "LICITAÇÕES",
                    tipo: "tel",
                    _id: uuid(),
                  },
                ],
              };
              setDataGovernment(government);
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterItems = governmentList.filter((item) =>
    [
      String(item.cnpj),
      item.name,
      item.address[0].uf,
      item.address[0].city,
    ].some((prop) => prop.toLowerCase().includes(value.toLowerCase()))
  );
  //console.log("redenrizou");
  const onChangeFilterGovernment = (e) => {
    setValue(e.target.value);
    if (filterItems.length > 0) setDataGovernment({});
  };

  return (
    <>
      <input
        type="search"
        className="border rounded-md p-1 outline-1 outline-blue-600 w-full"
        onChange={(e) => onChangeFilterGovernment(e)}
        placeholder="Digite o texto para pesquisar"
        onKeyDown={(e) => searchCnpj(e, value)}
      />
      {value.length > 0 ? (
        <>
          {filterItems.length <= 0 ? (
            <ul>
              <ItemList
                key={0}
                onDoubleClick={() => selectListItem(dataGoverment)}
              >
                {dataGoverment.name}
              </ItemList>
            </ul>
          ) : (
            <ul className="overflow-y-auto max-h-44 px-5">
              {filterItems.map((item, i) => (
                <ItemList key={i} onDoubleClick={() => selectListItem(item)}>
                  {i + 1} - {item[`${fieldset}`]}
                </ItemList>
              ))}
            </ul>
          )}
        </>
      ) : (
        <span className=" flex justify-center items-center w-full text-red-700 font-bold uppercase p-2 mt-2">
          Não há itens na lista !
        </span>
      )}
    </>
  );
};

ListSearch.propTypes = {
  list: PropTypes.array,
  dataList: PropTypes.array,
  fieldset: PropTypes.string,
};
export default ListSearch;
