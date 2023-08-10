import { RiGovernmentFill } from "react-icons/ri";

export function BidsDetails({ processos }) {
  return (
    <details>
      <summary>
        <RiGovernmentFill /> Licitações
      </summary>
      <fieldset>
        <table className="table table-sm">
          <thead></thead>
          <tbody>
            {processos.map((item) => (
              <tr>
                <td>
                  <tr>
                    <td>
                      <strong>Processo:</strong>
                    </td>
                    <td>{item.process_data.n_process}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Edital:</strong>
                    </td>
                    <td>{item.process_data.bidding_notice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Portal:</strong>
                    </td>
                    <td>{item.process_data.portal.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Disputa:</strong>
                    </td>
                    <td>
                      {new Date(
                        item.process_data.date_finish
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status:</strong>
                    </td>
                    <td>{item.process_data.status.name}</td>
                  </tr>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </details>
  );
}
