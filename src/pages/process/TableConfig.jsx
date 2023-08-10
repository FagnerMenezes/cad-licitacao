import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {
  FaAt,
  FaCalendar,
  FaEnvelope,
  FaHeartbeat,
  FaListAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { FcAlarmClock, FcCancel, FcDocument, FcUnlock } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import { GiMagnifyingGlass } from "react-icons/gi";
import { RiGovernmentFill } from "react-icons/ri";

export const col = [
  {
    name: (
      <span className="flex justify-center items-center w-full uppercase font-bold text-blue-800  text-md gap-1">
        <FaListAlt className="text-blue-600" /> Edital
      </span>
    ),
    sortable: true,
    selector: (row) => row.edital,
    maxWidth: "50px",
  },
  {
    name: (
      <span className="flex justify-center items-center w-full uppercase font-bold text-blue-800  text-md gap-1">
        <RiGovernmentFill className="text-blue-600" /> Órgão
      </span>
    ),
    sortable: true,
    selector: (row) => row.orgao,
  },
  {
    name: (
      <span className="flex justify-center items-center w-full uppercase font-bold text-blue-800  text-md gap-1">
        <FaCalendar className="text-blue-600" /> Data disputa
      </span>
    ),
    sortable: true,
    selector: (row) => row.data_final,
    center: true,
    maxWidth: "120px",
  },
  {
    name: (
      <span className="flex justify-center items-center w-full uppercase font-bold text-blue-800  text-md gap-1">
        <FaAt className="text-blue-600" /> Portal
      </span>
    ),
    sortable: true,
    selector: (row) => row.portal,
    center: true,
  },
  {
    name: (
      <span className="flex justify-center items-center w-full uppercase font-bold text-blue-800 text-md gap-1">
        <FaHeartbeat className="text-blue-600" /> Status
      </span>
    ),
    sortable: true,
    selector: (row) => row.status,
    maxWidth: "120px",
    center: true,
  },
  { name: "", sortable: true, selector: (row) => row.e, maxWidth: "20px" },
  { name: "", sortable: true, selector: (row) => row.d, maxWidth: "20px" },
];
export const STATUS_ICONS = {
  Homologado: <AiFillLike className="text-green-600" />,
  "Enviar documentos": <FaEnvelope />,
  Cancelado: <FcCancel />,
  Empenho: <FaMoneyBill />,
  "Cadastrar proposta": <FcDocument />,
  Suspenso: <FcUnlock />,
  "Proposta enviada": <FiSend />,
  "Não arrematado": (
    <AiFillDislike className="status-ico" style={{ color: "#f15e59" }} />
  ),
  "Aguardando disputa": <FcAlarmClock />,
  "Em analise": <GiMagnifyingGlass style={{ color: "#c91158fc" }} />,
};

export const conditionalRowStyles = [
  {
    when: (row) => row.s === "Cancelado",
    style: {
      color: "orange",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.s === "Proposta enviada",
    style: {
      color: "rgb(67, 121, 67)",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];
