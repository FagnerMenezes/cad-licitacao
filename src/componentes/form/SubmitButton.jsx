import { FaSave } from "react-icons/fa";
function SubmitButton({ text }) {
  return (
    <>
      <button className="flex justify-center items-center gap-2 sm:w-44 hover:bg-blue-500  bg-blue-600 p-2 border rounded-xl text-white font-bold">
        <FaSave className="text-white" /> {text}
      </button>
    </>
  );
}

export default SubmitButton;
