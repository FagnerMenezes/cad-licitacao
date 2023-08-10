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
        <div className="container overflow-x-scroll sm:overflow-hidden">
          {currentItems && (
            <table className="table">
              <thead className="">
                <tr
                  className=""
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <th>COD</th>
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
                    <tr style={{ fontSize: "10px" }}>
                      <td>{item.cod}</td>
                      <td>{item.amount}</td>
                      <td> {item.unit}</td>
                      <td>{item.description}</td>
                      <td>{item.brand}</td>
                      <td>{item.model}</td>
                      <td>
                        {parseFloat(
                          item.unitary_value.$numberDecimal
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td>
                        {parseFloat(
                          item.value_reference.$numberDecimal
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td>
                        {(
                          parseFloat(item.unitary_value.$numberDecimal) *
                          item.amount
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          type={"checkbox"}
                          checked={item.winner ? true : false}
                          readOnly
                        ></input>
                      </td>
                      <td>
                        <FaEdit
                          onClick={(e) => editItem(e, item._id)}
                          style={{ color: "green" }}
                        />
                      </td>
                      <td>
                        <FaTrash
                          onClick={(e) => deleteItem(e, item._id)}
                          style={{ color: "red" }}
                        />
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
          className="pagination pagination-sm"
          pageClassName="pagination pagination-sm"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousClassName="page-link"
          nextLinkClassName="page-link"
        />
      </nav>
    </>
  );
};

export default Pagination;
