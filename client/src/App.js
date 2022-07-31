import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";
import AdminView from "./components/pages/AdminView.js";
import UserView from "./components/pages/UserView.js";
import _404 from "./components/pages/_404.js";
import AuthRoute from "./protected-routes/AuthRoute.js";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AuthRoute Component={AdminView}/>} />
        <Route
          path="/user-tasks"
          element={<AuthRoute Component={UserView} />}
        />
        <Route path="/_404" element={<_404 />} />
        <Route path="*" element={<_404 />} />
      </Routes>
    </Router>
  );
}

export default App;
