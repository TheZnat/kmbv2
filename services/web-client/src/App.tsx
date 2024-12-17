import { Route, Routes } from "react-router-dom";
import "./index.css";
import Welcome from "./Page/Welcome";
import Room from "./Page/Room";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route element={<PrivateRoute />}>
        <Route path="/room" element={<Room />} />
      </Route>
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}

export default App;
