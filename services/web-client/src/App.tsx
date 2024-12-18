import { Route, Routes } from "react-router-dom";
import "./index.css";
import Welcome from "./Page/Welcome";
import Room from "./Page/Room/Room";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import { SocketProvider } from "./Component/SocketContext/SocketContext";

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<PrivateRoute />}>
          <Route path="/room" element={<Room />} />
        </Route>
        <Route path="*" element={<Welcome />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
