import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { UseProcessForm } from "./useProcessForm";

const LinksProcesso = ({ edital, uasg, portal, modality }) => {
  const { loadDataBec } = UseProcessForm();
  const [linksBec, setLinksBec] = useState([]);
  function Download_Edital_Comprasnet(e, uasg, edital) {
    e.preventDefault();
    const code_edital = edital;
    const windowFeatures = "left=10,top=200,width=620,height=320,location=no";
    window.open(
      `https://www.comprasnet.gov.br/ConsultaLicitacoes/Download/Download.asp?coduasg=${uasg}&numprp=${code_edital.replace(
        "/",
        ""
      )}&modprp=5&bidbird=N`,
      "_blank",
      windowFeatures
    );
  }

  function Download_Itens_Comprasnet(e, uasg, edital) {
    e.preventDefault();

    const code_edital = edital;
    const windowFeatures = "left=10,top=10,width=820,height=620";

    window.open(
      `http://comprasnet.gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp?coduasg=${uasg}&numprp=${code_edital.replace(
        "/",
        ""
      )}&modprp=5&bidbird=N`,
      "_blank",
      windowFeatures
    );
  }

  // async function loaderLinksBec(e) {
  //   e.preventDefault();
  //   const { links } = await loadDataBec(edital);
  //   setLinksBec(links);
  //   console.log("REDENRIZOU");
  // }

  useEffect(() => {
    (async () => {
      if (modality === "PE" && portal === "BEC") {
        console.log("REDENRIZOU");
        const { links } = await loadDataBec(edital);
        setLinksBec(links);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {portal === "BEC" && modality === "PE" && edital.length >= 22 ? (
        <>
          {/* <div className="flex justify-start items-center">
            <button
              onClick={(e) => loaderLinksBec(e)}
              className="bg-sky-700 border rounded-lg text-white items-center  h-11 p-2"
            >
              Carregar links da bec
            </button>
          </div> */}
          <div className="flex w-full">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {linksBec.length > 0 &&
                  linksBec.map((link) => (
                    <>
                      <tr key={link.key}>
                        <td>{link.text}:</td>
                        <td>
                          <span className="btn btn-outline-primary">
                            <a href={link.url} target="_blank" rel="noreferrer">
                              <FaDownload />
                            </a>
                          </span>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}
      {portal === "COMPRASNET" && modality === "PE" ? (
        <div className="col-md-12">
          <br />
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DOWNLOAD EDITAL:</td>
                <td>
                  <span className="btn btn-outline-primary">
                    <FaDownload
                      onClick={(e) =>
                        Download_Edital_Comprasnet(e, uasg, edital)
                      }
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <td>ITENS</td>
                <td>
                  <span className="btn btn-outline-primary">
                    <FaDownload
                      onClick={(e) =>
                        Download_Itens_Comprasnet(e, uasg, edital)
                      }
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
LinksProcesso.propTypes = {
  edital: PropTypes.string,
  uasg: PropTypes.string,
  portal: PropTypes.string,
  modality: PropTypes.string,
};
export default LinksProcesso;
