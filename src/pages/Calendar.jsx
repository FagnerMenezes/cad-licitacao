import Calendar from "../componentes/Calendar/Calendar";

const Calendario = () => {
  return (
    <>
      <div>
        <div>
          <h4 className="text-4xl font-bold">Boletins dos Processos</h4>
        </div>
        <div className="flex justify-center items-center w-full h-full p-2 mt-3 border rounded-lg bg-white">
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default Calendario;
