import { FaDownload, FaLink } from "react-icons/fa";

const LinksProcesso = ({ edital, uasg, portal }) => {
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

  return (
    <>
      {portal === "COMPRASNET" ? (
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
                  <span className="btn btn-outline-primary ">
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

export default LinksProcesso;
