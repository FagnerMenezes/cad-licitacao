import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const ButtonLink = styled.button`
  display: ${(props) => (props.exibir ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: transparent;
  text-decoration: none;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  font-size: ${(props) =>
    props.size === "large"
      ? "1.8em"
      : props.size === "medium"
      ? "1.em"
      : props.size === "small"
      ? "0.8em"
      : "1em"};
  ${(props) =>
    props.type === "primary"
      ? css`
          background: ${(props) => props.theme.colors.primary};
          border: 1px solid ${(props) => props.theme.colors.primary};
          #kid {
            color: white;
          }
          &:hover {
            background-color: transparent;
            #kid {
              font-weight: bolder;
              color: ${(props) => props.theme.colors.primary};
            }
          }
        `
      : props.type === "success"
      ? css`
          background: ${(props) => props.theme.colors.success};
          border: 1px solid ${(props) => props.theme.colors.success};
          #kid {
            color: white;
          }
          &:hover {
            background: #b3e0b3;
            border: 1px solid #b3e0b3;
            #kid {
              font-weight: bolder;
              color: white;
            }
          }
        `
      : props.type === "danger"
      ? css`
          background: ${(props) => props.theme.colors.danger};
          border: 1px solid ${(props) => props.theme.colors.danger};
          #kid {
            color: white;
          }
          &:hover {
            border: 1px solid #ee7676;
            background: #ee7676;
            #kid {
              color: white;
              font-weight: bolder;
            }
          }
        `
      : props.type === "white"
      ? css`
          background: white;
          color: ${(props) => props.theme.colors.primary};
          border: 1px solid ${(props) => props.theme.colors.primary};
          &:hover {
            background-color: ${(props) => props.theme.colors.primary};
            #kid {
              color: white;
            }
          }
        `
      : css`
          background: ${(props) => props.theme.colors.default};
          #kid {
            color: #0005;
          }
        `};
`;

const Links = styled.div``;

// function BtnLink({
//   to,
//   text,
//   title,
//   icon,
//   handleClick,
//   type,
//   exibe = true,
//   size,
// }) {
//   return (
//     <>
//       <ButtonLink size={size} type={type} exibir={exibe}>
//         <Links data-toogle="tooltip" title={title}>
//           <Link to={to} id="kid">
//             {text}
//             {icon}
//           </Link>
//         </Links>
//       </ButtonLink>
//     </>
//   );
// }

function BtnLink({ to, text, title, icon, handleClick, type, exibe, size }) {
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (handleClick) {
      handleClick(event);
    }
  };

  return exibe ? (
    <>
      <ButtonLink size={size} type={type} exibir={exibe}>
        <Links data-toggle="tooltip" title={title}>
          <Link to={to} id="kid">
            {text}
            {icon}
          </Link>
        </Links>
      </ButtonLink>
    </>
  ) : null;
}

BtnLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  handleClick: PropTypes.func,
  type: PropTypes.oneOf(["primary", "secondary"]),
  exibe: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default BtnLink;

//export default BtnLink;
