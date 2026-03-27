import { useState } from "react";
import api from "../../services/Api";
import SeleccionarProducto from "./SeleccionarProducto";
import useMensaje from "../notify/useMensaje";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import InventarioHeader from "./InventarioHeader";
import PrevisualizacionMovimiento from "../movimiento/PrevisualizacionMovimiento";
import Busqueda from "../layout/Busqueda";

const InventarioForm = () => {
    const {mensaje, cargarMensaje} = useMensaje();
    const [busqueda, setBusqueda] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [previsualizacion, setPrevisualizacion] = useState(false);
    const [movimiento, setMovimiento] = useState({
        productos:[],
        bodega:"",
        fechaEntrega:""
    });

    const [formulario, setFormulario] = useState({
        productos:[],
        bodega:"",
        fechaEntrega:""
    });
    const navigate = useNavigate();

    console.log("movimiento: ",movimiento)

    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);
        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const handleChange = (name, value) => {
        setFormulario(prev => ({
            ...prev,
            [name]:name==="fechaEntrega"? value: Number(value.id)
        }));

        setMovimiento(prev => ({
            ...prev,
            [name]:value

        }));
    };

    const agregarProductoBodega = async (data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api("api/inventario/ingresar/producto/","POST",data);
            limpiarFormulario();
            setPrevisualizacion(false);
            NotifySuccess("Productos ingresados al inventario correctamente.");

        } catch (error) {
            console.error(error)
            NotifyError("Error al ingresar producto a inventario.");

        } finally {
            setEnviando(false);
        }
    }
    
    const limpiarFormulario = () => {
        setFormulario({
            productos:[],
            bodega:"",
            fechaEntrega:""
        });
        setMovimiento({
            productos:[],
            bodega:"",
            fechaEntrega:""
        });
    }

    const handleOnClick = () => {
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
        if (!formulario.fechaEntrega){
            danger("fechaEntrega","debe ingresar la fecha de entrega");
            campoValido = false;
        }

        if (!campoValido) return;

        setPrevisualizacion(true);

    }

    const handleConfirmar = () => {
        agregarProductoBodega(formulario);

    }

    return (
        <div className="py-4 m-auto" style={{maxWidth:"77rem"}}>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-start">
                    <button
                        className="btn btn-arrow-light blue-title"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={28}/>
                    </button>
                    <h3 className="fw-bold mb-4 blue-title">Ingreso de Productos</h3>
                </div>
                <div>
                    <button className="btn btn-primary rounded-1 text-nowrap" onClick={handleOnClick}>
                        Previsualizar Ingreso
                    </button>
                </div>
            </div>
           
            <InventarioHeader 
                formulario={formulario}
                mensaje={mensaje}
                handleChange={handleChange}
            />
            <div className="card shadow-sm p-2">
                <Busqueda
                    setBusqueda={setBusqueda} 
                    busqueda={busqueda} 
                />

                <SeleccionarProducto
                    seleccionados={formulario.productos}
                    setSeleccionados={setFormulario}
                    setMovimiento={setMovimiento}
                    limpiarFormulario={limpiarFormulario}
                    busqueda={busqueda}
                />
            </div>
            {previsualizacion && (
                <PrevisualizacionMovimiento 
                    setPrevisualizacion={setPrevisualizacion} 
                    movimiento={movimiento}
                    handleConfirmar={handleConfirmar}
                    enviando={enviando}
                    action={"entrada"}
                />
            )}
        </div>
    );
};

export default InventarioForm;
