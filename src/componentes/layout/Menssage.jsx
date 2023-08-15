import PropTypes from "prop-types";
import styled, { css } from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin-bottom: 10px;
  ${(props) =>
    props.close &&
    css`
      display: none;
    `}
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 10px;
  width: 500px;
  text-align: center;
  ${(props) =>
    props.type === "erro"
      ? css`
          background: #f17373;
          color: white;
          border: 2px solid #f17373;
        `
      : ""};
`;

const Texto = styled.p`
  font-size: 18px;
  color: white;
`;

const Message = ({ text, tipo }) => {
  return (
    <Container>
      <Body type={tipo}>
        <Texto>{text}</Texto>
      </Body>
    </Container>
  );
};
Message.propTypes = {
  text: PropTypes.string,
  tipo: PropTypes.string,
};
export default Message;
