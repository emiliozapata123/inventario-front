import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMensaje from "../notify/useMensaje";
import api from "../../services/Api";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import { ArrowLeft } from "react-bootstrap-icons";
import MovimientoHeader from "./MovimientoHeader";
import TablaInventarioMovimiento from "./TablaInventarioMovimiento";

const MovimientoForm = () => {
    const [inventario, setInventario] = useState([]);
    const { mensaje, cargarMensaje } = useMensaje();
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [formulario, setFormulario] = useState({
        productos:[],
        bodega:"",
    });

    const navigate = useNavigate();

    useEffect(()=> {
        cargarInventario();
    }, []);


    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);

        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const cargarInventario = async (id) => {
        setFormulario(prev => ({
            ...prev,
            bodega:Number(id)
        }));
        
        setLoading(true);
        if (!id) return;

        try {
            const response = await api(`api/inventario/${Number(id)}/bodega/`);
            setInventario(await response.json());

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const limpiarFormulario = () => {
        setFormulario({
            productos:[],
            bodega:"",
        });
        setInventario([]);

    }

    const addMovimiento = async () => {
        try {
            await api("api/movimiento/create/","POST",formulario);
            NotifySuccess("Movimiento Registrado.");
            cargarInventario(formulario.bodega);

        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        if (!formulario.bodega){
            danger("bodega","debe seleccionar bodega");
            return;
        }
        if (formulario.productos.length === 0){
            NotifyError("Debe seleccionar Productos");
            return;
        }

        for (let i = 0; i < formulario.productos.length; i++) {
            const cantidad = formulario.productos[i].cantidad;

            if (!cantidad || cantidad < 1) {
                NotifyError("Error, el stock del producto debe ser al menos 1");
                return;
            }
        }

        addMovimiento(formulario);

    }

    return (
        <div className="container">
            <div className="d-flex pt-3 gap-2">
                <button
                    className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={16} />
                    Volver
                </button>
                <h3 className="fw-bol mb-2 blue-title">
                    Formulario de movimientos
                </h3>
            </div>
            <div className="card shadow-sm">
                <div className="card-body p-2">
                    <MovimientoHeader 
                        formulario={formulario}
                        mensaje={mensaje}
                        cargarInventario={cargarInventario}
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                    />
                    <TablaInventarioMovimiento
                        handleClick={handleClick}
                        productos={inventario} 
                        seleccionados={formulario.productos}
                        setSeleccionados={setFormulario}
                        limpiar={limpiarFormulario}
                        loading={loading}
                        busqueda={busqueda}
                    />
                </div>
            </div>
        </div>
    )
}
export default MovimientoForm;
