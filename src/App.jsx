import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
    </Routes>
  );
};

export default App;
