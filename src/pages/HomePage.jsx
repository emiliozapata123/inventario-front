import Dashboard from "../components/layout/Dashboard";
import ProductoPage from "./ProductoPage";
import BodegaPage from "./BodegaPage";
import ActivoPage from "./ActivoPage";
import InventarioPage from "./InventarioPage";
import UsuarioPage from "./UsuarioPage";
import MovimientoPage from "./MovimientoPage";
import BodegaDetail from "../components/bodega/BodegaDetail";
import { useState, useEffect } from "react";
import api from "../services/Api";
import { Route, Routes } from "react-router-dom";
import ActivoForm from "../components/activos/ActivoForm";
import NavBarMobile from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import MovimientoForm from "../components/movimiento/MovimientoForm";
import NotificacionStock from "../components/alertas/NotificacionStock";
import ResumenActivos from "../components/activos/ResumenActivos";
import ProductoActivoList from "../components/activos/ProductoActivoList";
import InventarioForm from "../components/inventario/InventarioForm";


const HomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [productos, setProductos] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=> {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const response = await api("api/inventario/alert-stock/");
            setProductos(await response.json());

        } catch (error) {
            console.error(error);
        }
    }

    const cerrarNotificacion = (id) => {
        setProductos(prev => prev.filter(p => p.id !== id));
    }

    return (
        <>
        <NavBarMobile setSidebarOpen={setSidebarOpen} setMobile={setMobile} sidebarOpen={sidebarOpen} mobile={mobile}/>
        <div className="d-flex vh-100">
            <Sidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="flex-grow-1 overflow-auto container">
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="productos" element={<ProductoPage />} />
                    <Route path="activos" element={<ActivoPage/>}/>
                    <Route path="activos/registrar" element={<ActivoForm/>}/>
                    <Route path="activos/resumen" element={<ResumenActivos/>}/>
                    <Route path="activos/productos/list" element={<ProductoActivoList/>}/>
                    <Route path="bodegas" element={<BodegaPage/>} />
                    <Route path="usuarios" element={<UsuarioPage/>} />
                    <Route path="bodega/:id" element={<BodegaDetail/>} />
                    <Route path="inventario" element={<InventarioPage/>}/>
                    <Route path="inventario/ingresar/producto" element={<InventarioForm/>}/>
                    <Route path="movimiento" element={<MovimientoPage/>}/>
                    <Route path="movimiento/form" element={<MovimientoForm/>}/>
                </Routes>
            </div>
            {productos && (
                <NotificacionStock onClose={cerrarNotificacion} productos={productos} />
            )}
        </div>
        </>
    )
}
export default HomePage;