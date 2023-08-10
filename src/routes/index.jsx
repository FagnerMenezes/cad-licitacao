import { createBrowserRouter } from "react-router-dom";
import App from "../App";

//Páginas
import Calendar from "../pages/Calendar";
import Empenhos from "../pages/Empenhos";
import Home from "../pages/Home";
import Government from "../pages/government/Government";
import NewGovernment from "../pages/government/NewGovernment";
import NewProcess from "../pages/process/NewProcess";
import Process from "../pages/process/Process";
//import Proposta from "../componentes/processos/Proposta";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/process",
        element: <Process />,
      },
      {
        path: "/empenhos",
        element: <Empenhos />,
      },
      {
        path: "/government",
        element: <Government />,
      },
      {
        path: "/newprocess",
        element: <NewProcess />,
      },
      {
        path: "/newgovernment",
        element: <NewGovernment />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
    ],
  },
]);

export default router;
