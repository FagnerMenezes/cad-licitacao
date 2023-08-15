import PropTypes from "prop-types";
import "../styles/processo.css";
const ToggleSwitch = ({ handleCLick, texto, value, name }) => {
  return (
    <>
      <div className="flex">
        <label htmlFor="flexSwitchCheckDefault" className="texto">
          {texto}
          <div className="button r" id="button-1">
            <input
              type="checkbox"
              className="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              defaultChecked={false}
              name={name}
              onChange={handleCLick}
              checked={value}
            />
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
        </label>
      </div>
    </>
  );
};
ToggleSwitch.propTypes = {
  handleCLick: PropTypes.func,
  texto: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
};
export default ToggleSwitch;
