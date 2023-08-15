import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import ReactPaginate from "react-paginate";

const PaginationFooter = ({ data }) => {
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

const Items = ({
  handleEditItem,
  handleDeleteItem,
  currentItems,
  children,
}) => {
  //console.log(items);
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
      {currentItems && (
        <>
          <div className="container overflow-x-auto ">
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
                  <th>ARREMATADO</th>
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
                      <td className="flex justify-center text-center p-2 items-center">
                        {item.winner === "true" || item.winner === true ? (
                          <AiOutlineLike className="text-emerald-500 text-lg" />
                        ) : (
                          <AiOutlineDislike className="text-red-500 text-lg" />
                        )}
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
            </table>
          </div>
          <div className="flex justify-end items-center p-2 w-full">
            {children}
          </div>
        </>
      )}
    </>
  );
};

const PaginationNav = ({ handlePageClick, pageCount }) => {
  return (
    <>
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

const Pagination = ({
  items,
  itemsPerPage,
  handleEditItem,
  handleDeleteItem,
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items
        currentItems={currentItems}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        items={items}
      >
        <PaginationFooter data={items} />
      </Items>
      <PaginationNav handlePageClick={handlePageClick} pageCount={pageCount} />
    </>
  );
};

PaginationFooter.propTypes = {
  data: PropTypes.object,
};

Pagination.propTypes = {
  items: PropTypes.array,
  itemsPerPage: PropTypes.number,
  handleEditItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
};
Items.propTypes = {
  handleEditItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  currentItems: PropTypes.array,
  items: PropTypes.array,
  children: PropTypes.array,
};
PaginationNav.propTypes = {
  handlePageClick: PropTypes.func,
  pageCount: PropTypes.number,
};
export default Pagination;
