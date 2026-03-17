import Login from "./pages/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Notify from "./components/notify/Notify";
import "./index.css";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import PaginaNoDisponible from "./components/PaginaNoDisponible";

function App() {
    return (
        <>
        <Router>
            <Notify/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home/*" 
                   
                    element={
                        <PrivateRoute>
                            <HomePage/>
                        </PrivateRoute>
                }/>
                <Route path="*" element={<PaginaNoDisponible/>}/>
            </Routes>
        </Router>
        </>
    );
}

export default App;
