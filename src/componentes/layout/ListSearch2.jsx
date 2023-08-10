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
const Texto = styled.span`
  font-weight: bold;
`;

const ListSearch = ({ list, handleDoubleClick, fildset, fildset2, texto }) => {
  const [lista] = useState(list || []);
  const [value, setValue] = useState("");
  //console.log(list);
  function doubleClick(list) {
    handleDoubleClick(list);
  }
  return (
    <>
      <SearchList
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite o texto para pesquisar"
      />
      {value.length > 0 ? (
        <ul>
          {lista
            .filter((e) =>
              e[`${fildset}`][`${fildset2}`].toLowerCase().includes(value)
            )
            .map((item, i) => (
              <ItemList key={i} onDoubleClick={(e) => doubleClick(item)}>
                {texto} <Texto> {item[`${fildset}`][`${fildset2}`]}</Texto>
              </ItemList>
            ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default ListSearch;
