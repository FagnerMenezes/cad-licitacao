import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";

const DtTable = ({ coll, ds, titulo, conditionalRowStyles }) => {
  //console.log(ds);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(ds);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [ds]);

  return (
    <>
      <DataTable
        title={titulo}
        columns={coll}
        data={rows}
        pagination
        progressPending={pending}
        progressComponent={<Loader />}
        conditionalRowStyles={conditionalRowStyles}
        selectableRows={true}
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  );
};

export default DtTable;
