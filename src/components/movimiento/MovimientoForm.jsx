import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMensaje from "../notify/useMensaje";
import api from "../../services/Api";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import { ArrowLeft } from "react-bootstrap-icons";
import MovimientoHeader from "./MovimientoHeader";
import SelectProductoMovimiento from "./SelectProductoMovimiento";
import PrevisualizacionMovimiento from "./PrevisualizacionMovimiento";

const MovimientoForm = () => {
    const [movimiento, setMovimiento] = useState({
        productos:[],
        bodega:"",
        fechaMovimiento:""
    });
    const [formulario, setFormulario] = useState({
        productos:[],
        bodega:"",
        fechaMovimiento:""
    });
    const [inventario, setInventario] = useState([]);
    const { mensaje, cargarMensaje } = useMensaje();
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [previsualizacion, setPrevisualizacion] = useState(false);
   
    const navigate = useNavigate();

    const danger = (name, mensaje) => {
        cargarMensaje(name,mensaje);

        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const handleOnChange = async (name, value) => {
        const id = Number(value.id);

        setFormulario((prev) => ({
            ...prev,
            [name]: name === "fechaMovimiento" ? value : id
        }));

        setMovimiento((prev) => ({
            ...prev,
            [name]:value
        }));

        if (name === "fechaMovimiento") return;

        await cargarInventario(id);
    }

    const cargarInventario = async (id) => {
        if (!id) return;

        setLoading(true);
        try {
            const response = await api(`api/inventario/${id}/bodega/`);
            setInventario(await response.json());

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    const limpiarFormulario = () => {
        setInventario([]);

        setFormulario({
            productos:[],
            bodega:"",
            fechaMovimiento:""
        });
        setMovimiento({
            productos:[],
            bodega:"",
            fechaMovimiento:""
        });
    }

    const cargarFecha = () => {
        const fechaActual = new Date();

        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();

        const diaConCero = dia.toString().padStart(2, "0");
        const mesConCero = mes.toString().padStart(2, "0");
        const fecha = `${anio}-${mesConCero}-${diaConCero}`;

        setMovimiento((prev) => ({
            ...prev,
            fechaMovimiento:fecha
        }));
    }

    const addMovimiento = async () => {
        const listaInventario = inventario.map(i => ({ ...i }));

        setInventario(prev =>
            prev.map(item => {
                const seleccionado = formulario.productos.find(
                    p => p.id === item.producto.id && item.stock > 0
                );

                if (seleccionado) {
                    return {
                        ...item,
                        stock: item.stock - seleccionado.cantidad
                    };
                }
                return item;
            })
        );


        if (enviando) return;
        setEnviando(true);

        try {
            await api("api/movimiento/create/","POST",formulario);
            setPrevisualizacion(false);
            NotifySuccess("Movimiento Registrado.");

        } catch (error) {
            console.error(error);
            NotifyError("Error al registrar movimiento.");
            setInventario(listaInventario);
            
        } finally {
            setEnviando(false);
        }
    }

    const handleConfirmar = () => {
        addMovimiento(formulario);
    }

    const handleClick = () => {
        if (!formulario.bodega) {
            danger("bodega","debe seleccionar bodega");
            return;
        }
        if (formulario.productos.length === 0) {
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

        if (!movimiento.fechaMovimiento) {
            cargarFecha();
        }

        setPrevisualizacion(true);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex mb-3 justify-content-center">
                    <button
                        className="btn btn-arrow-light blue-title"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={28}/>
                    </button>
                    <div>
                        <h3 className="fw-bol blue-title">
                            Formulario de movimientos
                        </h3>
                        <p className="text-muted mb-0">
                            Ingresa productos y gestiona movimientos de inventario
                        </p>
                    </div>
                </div>
                <div>
                    <button 
                        className="btn btn-primary rounded-1 text-nowrap"
                        onClick={handleClick}
                    >
                        Mostrar Previsualizacion
                    </button>
                </div>
            </div>
            
            <div className="card shadow-sm">
                <div className="card-body p-2">
                    <MovimientoHeader 
                        formulario={formulario}
                        mensaje={mensaje}
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        handleOnChange={handleOnChange}
                    />
                    <SelectProductoMovimiento
                        handleClick={handleClick}
                        productos={inventario} 
                        seleccionados={formulario.productos}
                        setSeleccionados={setFormulario}
                        limpiar={limpiarFormulario}
                        loading={loading}
                        busqueda={busqueda}
                        setMovimiento={setMovimiento}
                    />
                </div>
            </div>
            {previsualizacion && (
                <PrevisualizacionMovimiento 
                    setPrevisualizacion={setPrevisualizacion}
                    handleConfirmar={handleConfirmar}
                    movimiento={movimiento}
                    enviando={enviando}
                />
            )}
        </>
    )
}
export default MovimientoForm;
