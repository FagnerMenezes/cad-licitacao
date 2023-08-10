import "../styles/processo.css";

const ToogleSwitch = ({ handleCLick, texto, value, name }) => {
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
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
        </label>
      </div>
    </>
  );
};

export default ToogleSwitch;
