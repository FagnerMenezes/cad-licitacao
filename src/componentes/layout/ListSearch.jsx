import { useState } from "react";
import styled from "styled-components";

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
const SearchList = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 400px;
  height: 45px;
  outline: none;
  margin-left: 35px;
  &:hover {
    outline: 1px solid blue;
  }
`;

const ListSearch = ({ list, dataList, fieldset }) => {
  const [value, setValue] = useState("");
  const governmentList = list;

  function selectListItem(data) {
    dataList(data);
  }

  const filterItems = governmentList.filter((data) =>
    // console.log("🚀 ~ file: ListSearch.jsx:41 ~ ListSearch ~ filterItems:", data)
    data[`${fieldset}`].toLowerCase().includes(value.toLocaleLowerCase())
  );

  return (
    <>
      <SearchList
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite o texto para pesquisar"
      />
      {value.length > 0 ? (
        <>
          <ul>
            {filterItems.map((item) => (
              <ItemList
                key={item._id}
                onDoubleClick={() => selectListItem(item)}
              >
                {item[`${fieldset}`]}
              </ItemList>
            ))}
          </ul>
        </>
      ) : (
        <span className=" flex justify-center items-center w-full text-red-700 font-bold uppercase p-2 mt-2">
          Não há itens na lista !
        </span>
      )}
    </>
  );
};

export default ListSearch;
