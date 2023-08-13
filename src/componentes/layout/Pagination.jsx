import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import ReactPaginate from "react-paginate";
const SomarItens = ({ data }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <strong>Total geral:</strong>
        <div style={{ color: "blue", fontWeight: "bolder" }}>
          {data &&
            data
              .map(
                (item) =>
                  parseFloat(item.unitary_value.$numberDecimal) * item.amount
              )
              .reduce((accumulator, currentValue) => accumulator + currentValue)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </div>
      </div>
    </>
  );
};

const Pagination = ({
  items,
  itemsPerPage,
  handleEditItem,
  handleDeleteItem,
}) => {
  function Items({ currentItems }) {
    const editItem = (e, idItem) => {
      e.preventDefault();

      handleEditItem(2, idItem);
    };

    const deleteItem = (e, idItem) => {
      e.preventDefault();
      handleDeleteItem(idItem);
    };
    return (
      <>
        <div className="container overflow-x-auto ">
          {currentItems && (
            <table className="table-auto min-w-full text-sm font-light">
              <thead className="border-b bg-blue-600 text-white p-2">
                <tr className="text-center p-2">
                  <th className="p-1">COD</th>
                  <th>QTDE</th>
                  <th>UND</th>
                  <th>DESCRIÇÃO</th>
                  <th>MARCA</th>
                  <th>MODELO</th>
                  <th>V.UNIT </th>
                  <th>V.REF</th>
                  <th>TOTAL</th>
                  <th>Arrem.</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <>
                    <tr
                      style={{ fontSize: "10px" }}
                      className="hover:cursor-pointer hover:bg-blue-200 border"
                    >
                      <td className="text-center">{item.cod}</td>
                      <td className="text-center">{item.amount}</td>
                      <td className="text-center"> {item.unit}</td>
                      <td className="text-justify whitespace-pre-line">
                        {item.description}
                      </td>
                      <td className="text-center">{item.brand}</td>
                      <td className="text-center">{item.model}</td>
                      <td className="text-center">
                        {parseFloat(
                          item.unitary_value.$numberDecimal
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="text-center">
                        {parseFloat(
                          item.value_reference.$numberDecimal
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="text-center">
                        {(
                          parseFloat(item.unitary_value.$numberDecimal) *
                          item.amount
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="text-center">
                        <input
                          type={"checkbox"}
                          checked={item.winner ? true : false}
                          readOnly
                        ></input>
                      </td>
                      <td className="text-center text-emerald-500">
                        <FaEdit onClick={(e) => editItem(e, item._id)} />
                      </td>
                      <td className="text-center text-red-500">
                        <FaTrash onClick={(e) => deleteItem(e, item._id)} />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          )}
          <SomarItens data={items} />
        </div>
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <nav>
        <ReactPaginate
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          nextLabel={<ImNext2 />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<ImPrevious2 />}
          renderOnZeroPageCount={null}
          className="flex items-center gap-1"
          pageClassName="p-2"
          pageLinkClassName=""
          activeClassName="flex bg-blue-600 text-white h-7 w-7 border rounded-full justify-center items-center"
          previousClassName="text-blue-600"
          nextLinkClassName="text-blue-600"
        />
      </nav>
    </>
  );
};

export default Pagination;
