import PropTypes from "prop-types";
const ContainerBody = (props) => {
  return (
    <>
      <div className="flex border rounded-lg p-1 w-full">{props.children}</div>
    </>
  );
};
ContainerBody.propTypes = {
  children: PropTypes.array,
};
export default ContainerBody;
