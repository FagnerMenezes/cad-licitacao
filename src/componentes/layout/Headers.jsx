import styled from "styled-components";
import { FaUser, FaBell, FaHamburger, FaList } from "react-icons/fa";
import { GiBangingGavel } from "react-icons/gi";
import Avatar from "@mui/material/Avatar";
import avatar from "../../assets/img/meuAvatar.png";
const Container = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
`;
const User = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  gap: 15px;
`;
const Notif = styled.span`
  margin-right: 5px;
`;

const Logo = styled.i`
  margin-top: -5px;
  font-size: 45px;
  color: #4059ad;
`;

const Email = styled.span`
  font-size: 10pt;
  font-family: "Courier New", Courier, monospace;
`;

const ContainerLogo = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-around;
  align-items: center;
`;

function Headers({ title }) {
  return (
    <Container className="flex justify-around sm:justify-between sm:w-full">
      {/* <FaList className="sm:invisible ml-2 mt-3 text-xl" /> */}
      <ContainerLogo>
        <h5 className="sm:text-lg font-serif">
          <strong>ER COMERCIAL</strong>
        </h5>
      </ContainerLogo>
      <div className="flex justify-center items-center text-lg font-bold">
        {title}
      </div>
      <User className="">
        <span>
          <FaBell />
        </span>
        <Notif>
          {/* <FaUser /> */}
          <Avatar alt="Remy Sharp" src={avatar} />
          {/* <Email>licitacoes1@eduar.com.br</Email> */}
        </Notif>
      </User>
    </Container>
  );
}

export default Headers;
