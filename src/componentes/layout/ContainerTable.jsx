const ContainerTable = (props) => {
  return (
    <>
      <div className="flex flex-col w-full">{props.children}</div>
    </>
  );
};

export default ContainerTable;
