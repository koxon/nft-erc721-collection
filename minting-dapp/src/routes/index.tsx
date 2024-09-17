import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routePaths } from "./routePaths";
import Home from "components/Home";
import Mint from "components/Mint";

const Router = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path={routePaths.home} element={<Home />} />
          <Route path={routePaths.mint} element={<Mint />} />
          {/*<Route path={routePaths.about} element={<RaffleProfilePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default Router;
