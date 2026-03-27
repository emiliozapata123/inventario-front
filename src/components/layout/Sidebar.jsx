import {Grid,Box,Archive,People,Boxes,PcDisplay,Receipt} from "react-bootstrap-icons";
import "./Sidebar.css";
import CambiarContrañena from "../usuario/CambiarContraseña";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    const logout = () => {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        navigate("/");
    }

    return (
        <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

            <div className="d-flex align-items-center mb-4">
                <div className="logo-box me-3">
                <Box size={22} />
                </div>
                <div>
                <h4 className="fw-bold mb-0">Inventario</h4>
                <small className="color-white">Sistema de gestión</small>
                </div>
            </div>

            <div className="user-card p-3 mb-4">
                <div className="d-flex gap-2 align-items-center mb-2">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{width:"35px",height:"35px"}}>
                        {user?.nombre.charAt(0).toUpperCase()}
                    </div>
                    <span className="fw-semibold">{user?.nombre}</span>
                </div>
                <button 
                    className="btn btn-sm btn-blue mt-3 w-100 rounded-4"
                    onClick={() => setMostrarModal(true)}
                >
                    Cambiar contraseña
                </button>
            </div>
            <hr />

             <div className="sidebar-menu">
                <NavLink to={"/home"} end className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <Grid size={18} className="me-3" />
                    Dashboard
                </NavLink>
                <NavLink to="/home/productos" className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <Box size={18} className="me-3" />
                    Productos
                </NavLink>
                <NavLink to="/home/activos" className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <PcDisplay size={18} className="me-3" />
                    Activos
                </NavLink>
                <NavLink to="/home/bodegas" className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <Archive size={18} className="me-3" />
                    Bodegas
                </NavLink>
                <NavLink to="/home/inventario" className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <Boxes size={18} className="me-3" />
                    Inventario
                </NavLink>
                <NavLink to="/home/movimiento" className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <Receipt size={18} className="me-3" />
                    Movimiento
                </NavLink>
                <NavLink to="/home/usuarios" className={({isActive})=> `sidebar-item text-decoration-none ${isActive ? "active":""}`} onClick={()=> setSidebarOpen(false)}>
                    <People size={18} className="me-3" />
                    Usuarios
                </NavLink>
            </div>
            <hr />
            <div className="sidebar-footer">
                <button className="sidebar-item" onClick={logout}>
                    <i className="bi bi-box-arrow-right me-3"></i>
                    Cerrar Sesión
                </button>
            </div>
        {mostrarModal && <CambiarContrañena setMostrarModal={setMostrarModal}/>}
        </div>
    );
};

export default Sidebar;