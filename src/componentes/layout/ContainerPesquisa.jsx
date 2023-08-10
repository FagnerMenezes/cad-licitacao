import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import Input from "../form/Input";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  background-color: white;
  width: 85vw;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const ContainerPesquisa = ({
  handleDateInit,
  handleDateEnd,
  handleChangeLocalizar,
  dateInicio,
  dateFim,
  exibeDate = false,
  isOpen = false,
}) => {
  return (
    <div>
      <div className="container">
        {exibeDate && (
          <div className="row">
            <div className="col-sm-3">
              <Input
                type="date"
                text="Ínicio"
                handleOnChange={handleDateInit}
                defaultValue={
                  dateInicio
                    ? new Date(dateInicio).toISOString().split("T")[0]
                    : new Date(Date.now()).toISOString().split("T")[0]
                }
              />
            </div>
            <div className="col-sm-3">
              <Input
                type="date"
                text="Fim"
                handleOnChange={handleDateEnd}
                defaultValue={
                  dateFim
                    ? new Date(dateFim).toISOString().split("T")[0]
                    : new Date(Date.now()).toISOString().split("T")[0]
                }
              />
            </div>
          </div>
        )}
        <div className="flex flex-col m-auto">
          <div
            className="
            group
            flex 
            gap-2
            items-center
            sm:w-96
            border 
            rounded-lg 
            h-9 
            mb-2 
            mt-2 
            outline-blue-400 
            p-1
            hover:ring-1 ring-blue-500"
          >
            <FaSearch className="text-slate-400 ml-2 hover:text-blue-500" />
            <input
              className="w-96 outline-none"
              type="search"
              // text="Localizar"
              placeholder="Localizar"
              onKeyDown={handleChangeLocalizar}
            />
          </div>
          <div className="col-sm-2">
            {isOpen ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContainerPesquisa;
