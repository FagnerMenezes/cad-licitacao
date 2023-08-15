import PropTypes from "prop-types";
const ContainerGeral = (props) => {
  return (
    <>
      <div className="flex flex-col justify-center p-4 bg-white border rounded-md">
        {props.children}
      </div>
    </>
  );
};
ContainerGeral.propTypes = {
  children: PropTypes.array,
};
export default ContainerGeral;
