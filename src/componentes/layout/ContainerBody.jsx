const ContainerBody = (props) => {
  return (
    <>
      <div className="flex border rounded-lg p-1 w-full">{props.children}</div>
    </>
  );
};

export default ContainerBody;
