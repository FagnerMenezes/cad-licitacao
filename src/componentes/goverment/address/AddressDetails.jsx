//import { useState } from "react";
import { FaEdit, FaPhone, FaTrash } from "react-icons/fa";
export function AddressDetails({
  data,
  openModal,
  editAddress,
  deleteAddress,
}) {
  //const [orgaos, setOrgaos] = useState(data || {});

  return (
    <>
      <div className="flex flex-col p-2">
        <div className="flex justify-start items-center gap-2 ">
          <FaPhone className="text-blue-700" />{" "}
          <span className="text-blue-700 font-bold">Endereços</span>
        </div>

        <div className="flex border rounded-md p-3 mt-2 container overflow-x-scroll sm:overflow-hidden">
          <div className="flex flex-col">
            <div className="flex mb-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={(e) => openModal()}
                style={{ width: "100px" }}
              >
                Novo
              </button>
            </div>
            <div className="flex">
              {!!data.address?.length > 0 && (
                <>
                  <table
                    className="table table-striped"
                    style={{ width: "600px" }}
                  >
                    <thead>
                      <tr className="bg-primary text-white">
                        <th>Tipo</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>#</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.address.map((item, i) => (
                        <>
                          <tr key={i}>
                            <td>{item.type_address}</td>
                            <td>
                              {item.street} - {item.number}
                            </td>
                            <td>{item.district}</td>
                            <td>{item.city}</td>
                            <td>{item.uf}</td>

                            <td className="hover:cursor-pointer">
                              <i
                                onClick={(e) => editAddress(item._id)}
                                style={{ color: "green" }}
                              >
                                <FaEdit />
                              </i>
                            </td>
                            <td className="hover:cursor-pointer">
                              <i
                                onClick={(e) => deleteAddress(item._id)}
                                style={{ color: "red" }}
                              >
                                <FaTrash />
                              </i>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
