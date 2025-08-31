import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Trades from "./pages/trades";

export default function App() {


  return <div>
    <BrowserRouter>
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Signin />} path="/signin" />
        <Route element={<Trades />} path="/trading" />
      </Routes>
    </BrowserRouter>

  </div>
}

