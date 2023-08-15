import PropTypes from "prop-types";
import { FaEdit, FaPhone, FaTrash } from "react-icons/fa";
export function ContactDetails({ data, openModal, getContact, deleteContact }) {
  function openModalContact() {
    openModal();
  }

  return (
    <>
      {/*CONTATO */}
      <div className="flex flex-col mt-3">
        <div className="flex justify-start items-center gap-2 mb-2">
          <FaPhone className="text-blue-700" />{" "}
          <span className="text-blue-700 font-bold">Contatos</span>
        </div>

        <div className="flex flex-col border rounded-md p-3 container overflow-x-auto">
          <div className="flex mb-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={(e) => openModalContact()}
              style={{ width: "100px" }}
            >
              Novo
            </button>
          </div>
          <div className="flex ">
            <div className="flex">
              {data.contact?.length > 0 && (
                <>
                  <table className="table table-striped">
                    <thead className="bg-primary text-white">
                      <tr className="w-full text-center">
                        <th>Tipo</th>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Setor</th>
                        <th>#</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {data.contact.map((item, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap px-2 py-2">
                            {item.tipo}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2">
                            {item.contact}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2">
                            {item.sector}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 hover:cursor-pointer">
                            <i
                              onClick={(e) => getContact(item._id)}
                              style={{ color: "green" }}
                            >
                              <FaEdit />
                            </i>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 hover:cursor-pointer">
                            <i
                              onClick={(e) => deleteContact(item._id)}
                              style={{ color: "red" }}
                            >
                              <FaTrash />
                            </i>
                          </td>
                        </tr>
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

ContactDetails.propTypes = {
  data: PropTypes.object,
  openModal: PropTypes.func,
  getContact: PropTypes.func,
  deleteContact: PropTypes.func,
};
