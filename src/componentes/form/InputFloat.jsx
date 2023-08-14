import styled from "styled-components";

const Control = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2em;
  position: relative;
  padding-top: 13px;
  width: 100%;
`;
const Label = styled.label`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 35px;
  margin-left: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  font-size: 12px;
  font-weight: 500;
  color: rgb(110, 108, 108);
`;
const Input = styled.input`
  border: 1px solid #3951b2;
  outline: none !important;
  font-size: 14px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  border-radius: 10px;
  margin-top: 12px;
  padding: 0.4em;
  width: 100%;
  color: blue;
  &::placeholder {
    color: transparent;
  }
  &:focus {
    border-bottom: 2px solid #3951b2;
  }
  &:required:invalid + label {
    color: red;
  }
  &:focus:required:invalid {
    border-bottom: 2px solid red;
  }
  &:required:invalid + label:before {
    content: "* ";
  }
  &:focus + label {
    font-size: 13px;
    margin-top: 15px;
    margin-left: 14px;
    background-color: white;
    color: #444646;
    font-weight: bolder;
    text-transform: uppercase;
  }
  &:not(:placeholder-shown) + label {
    font-size: 13px;
    margin-top: 15px;
    margin-left: 14px;
    background-color: white;
    color: #575858;
    font-weight: bolder;
    text-transform: uppercase;
  }
`;

const InputFloat = ({
  text,
  type,
  name,
  placeholder,
  required,
  handleOnChange,
  value,
  readOnly = false,
  size,
  ...props
}) => {
  return (
    <Control>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleOnChange}
        name={name}
        readOnly={readOnly}
        className=""
      />
      <Label htmlFor={name}>{text}</Label>
    </Control>
  );
};

export default InputFloat;
