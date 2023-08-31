import PropTypes from "prop-types";
export const formatDate = (initialDate) => {
  const date = new Date(initialDate).toISOString().split("T")[0];
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  //console.log(date);
  const dateFormatted = `${day}/${month}/${year}`;
  return dateFormatted;
};
formatDate.propTypes = {
  initialDate: PropTypes.string,
};
