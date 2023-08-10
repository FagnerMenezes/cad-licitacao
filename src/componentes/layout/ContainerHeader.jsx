import { FaPlus, FaListUl, FaSpinner, FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";
import BtnLink from "./BtnLink";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 3px;
  align-items: center;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 85vw;
  padding: 10px 20px;
`;
const GroupBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 3px;
  align-items: center;
  padding: 10px 20px;
`;
const Title = styled.h5`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background: transparent;
  border: 0;
`;

const ContainerHeader = ({
  link,
  refresh,
  title,
  linkList,
  exibeBtnAdd = true,
  exibeBtnLRefresh = true,
  exibeBtnList = true,
  handeclick,
  exibeBtn = true,
}) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <GroupBtn>
              <BtnLink
                title="Adicionar novo"
                type="white"
                icon={<FaPlus />}
                to={link}
                text={""}
                exibe={exibeBtnAdd}
              />
              <BtnLink
                title="Recarregar"
                type="white"
                icon={<FaSpinner />}
                to={""}
                text=""
                handleClick={refresh}
                exibe={exibeBtnLRefresh}
              />
              <BtnLink
                title="Volta a lista"
                type="white"
                icon={<FaListUl />}
                to={linkList}
                text=""
                exibe={exibeBtnList}
              />
              <Button onClick={handeclick}>
                <BtnLink
                  title="Adicionar novo"
                  type="white"
                  icon={<FaPlusCircle />}
                  text=""
                  exibe={exibeBtn}
                />
              </Button>
            </GroupBtn>
          </div>
          <div className="col-8">
            <Title>{title}</Title>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerHeader;
