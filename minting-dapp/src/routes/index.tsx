import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routePaths } from "./routePaths";
import Home from "components/Home";
import Mint from "components/Mint";
import ScrollToTopRouter from "components/ScrollToTopRouter";
import About from "components/About";

const Router = () => (
  <>
    <BrowserRouter>
      <ScrollToTopRouter />
      <Routes>
        <Route>
          <Route path={routePaths.home} element={<Home />} />
          <Route path={routePaths.mint} element={<Mint />} />
          <Route path={routePaths.about} element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default Router;
