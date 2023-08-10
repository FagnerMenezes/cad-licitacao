import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import {
  GlobalStyle,
  // Main,
  Headers,
  SideMenu,
  //Footer,
  theme,
} from "./services/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/**CONTAINER GERAL */}
      <div className="grid grid-cols-1 sm:grid-cols-12">
        {/**MENU LATERAL */}
        <div className="col-end-1 row-span-2 sm:visible ">
          <SideMenu />
        </div>
        {/**HEADER */}
        <div className="col-span-12">
          <Headers />
        </div>

        {/**MAIN */}
        <div
          className="
        col-span-12
        bg-slate-100
        border-l-2
        border-t-2 
        rounded-ss-xl p-4 min-h-[100vh] sm:ml-0 ml-1"
        >
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
