import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/login";
import Main from "./components/Main";
import CardData from "./pages/CardData";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProfileChange from "./pages/ProfileChange";
import PassordChange from "./pages/PassordChange";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/card/:id" element={<CardData />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/change" element={<ProfileChange />} />
          <Route path="/profile/change-assword" element={<PassordChange />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
