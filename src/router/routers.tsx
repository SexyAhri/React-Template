import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
