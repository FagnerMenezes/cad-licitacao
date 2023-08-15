import PropTypes from "prop-types";
const ContainerTable = (props) => {
  return (
    <>
      <div className="flex flex-col w-full">{props.children}</div>
    </>
  );
};
ContainerTable.propTypes = {
  children: PropTypes.array,
};
export default ContainerTable;
