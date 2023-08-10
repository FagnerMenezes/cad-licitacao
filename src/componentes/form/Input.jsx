import styled from "styled-components";

const Control = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  margin-top: -12px;
`;
const Label = styled.label`
  font-weight: bold;
  margin-top: 20px;
  font-size: 12px;
`;
const Texto = styled.input`
  padding: 0.4em;
  border: 1px solid #f4f4f4;
  outline-color: transparent;
  outline: none;
  margin-left: 5px;
  color: blue;
  &::placeholder {
    color: #7b7b7b;
    &:focus {
      border-bottom: 1px solid cornflowerblue;
    }
  }
`;

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  readOnly = false,
  hidden = false,
}) {
  return (
    <Control>
      <Label htmlFor={name}>{text}</Label>
      <Texto
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        onChange={handleOnChange}
        value={value}
        required
      />
    </Control>
  );
}

export default Input;
