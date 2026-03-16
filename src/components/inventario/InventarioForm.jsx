import { useState, useEffect } from "react";
import api from "../../services/Api";
import IngresoMultipleProductos from "./IngresoMultipleProducto";
import useMensaje from "../notify/useMensaje";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import InventarioHeader from "./InventarioHeader";
import InventarioTableHeader from "./InventarioTableHeader";

const InventarioForm = () => {
    const {mensaje, cargarMensaje} = useMensaje();
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] = useState([]);
    const [formulario, setFormulario] = useState({
        productos:[],
        bodega:"",
        fecha:""
    });
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);

        try {
            const resProductos = await api("api/producto/list/");

            setProductos(await resProductos.json());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);
        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const handleChange = (name, valor) => {
        setFormulario(prev => ({
            ...prev,
            [name]:name==="fecha"?valor: Number(valor)
        }));
    };

    const agregarProductoBodega = async (data) => {
        try {
            await api("api/inventario/ingresar/producto/","POST",data);
            limpiarFormulario();
            NotifySuccess("Productos ingresados al inventario correctamente.");

        } catch (error) {
            console.error(error)
        }
    }
    
    const limpiarFormulario = () => {
        setFormulario({
            productos:[],
            bodega:"",
            fecha:""
        });
    }

    const handleClick = async (e) => {
        e.preventDefault();

        let campoValido = true;

        if (formulario.productos.length === 0){
            NotifyError("Seleccione Productos.");
            campoValido = false;
        }

        for (let i = 0; i < formulario.productos.length; i++) {
            const cantidad = formulario.productos[i].cantidad;

            if (!cantidad || cantidad < 1){
                NotifyError("la cantidad debe ser minimo 1");
                return;
            }
        }
       
        if (!formulario.bodega){
            danger("bodega","Seleccione una bodega");
            campoValido = false;
        }
        if (!formulario.fecha){
            danger("fecha","debe ingresar la fecha de ingreso");
            campoValido = false;
        }

        if (!campoValido) return;

        agregarProductoBodega(formulario);
      
    };

    return (
        <div className="container py-4">
            <div className="d-flex gap-2">
                <button
                    className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={16} />
                    Volver
                </button>
                <h3 className="fw-bold mb-4 blue-title">Ingreso de Productos</h3>
            </div>
            <InventarioHeader 
                formulario={formulario}
                mensaje={mensaje}
                handleChange={handleChange}
            />
            <div className="card shadow-sm p-2">
                <InventarioTableHeader 
                    setBusqueda={setBusqueda} 
                    busqueda={busqueda} 
                    handleClick={handleClick}
                    limpiarFormulario={limpiarFormulario}
                />

                <IngresoMultipleProductos
                    productos={productos}
                    seleccionados={formulario.productos}
                    setSeleccionados={setFormulario}
                    limpiarFormulario={limpiarFormulario}
                    handleClick={handleClick}
                    loading={loading}
                    busqueda={busqueda}
                />
            </div>
        </div>
    );
};

export default InventarioForm;
