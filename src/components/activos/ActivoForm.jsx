import { useNavigate } from "react-router-dom";
import api from "../../services/Api";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
import SelectProductoTable from "./SelectProductoTable";
import SelectProductoButton from "./SelectProductoButton";
import useFetch from "../notify/useFetch";

const ActivoForm = () => {
    const [formulario, setFormulario] = useState({
        invId:"",
        producto:"",
        bodega:"",
        numeroInventario:"",
        numeroSerie:"",
        ubicacion:"",
        usuario:"",
        cargo:"",
        fechaMovimiento:""
    });
    const [activos, setActivos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [enviando, setEnviando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data:bodegas } = useFetch("api/bodega/list/");
    const navigate = useNavigate();

    useEffect(()=> {
        cargarActivos();
        cargarProductos();
    }, []);

    const cargarActivos = async () => {
        try {
            const response = await api("api/activo/list/");
            setActivos(await response.json());

        } catch (error) {
            console.error(error);
        }
    }

    //productos de tipo activos
    const cargarProductos = async () => {
        setLoading(true);
        
        try {
            const response = await api("api/inventario/activo/list/");
            setProductos(await response.json());

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    }
    
    const addActivo = async (data) => {
        setProductos(prev => prev.map(p => p.id === formulario.producto
            ? {...p, cantidad: p.cantidad-1}
            : p
        ));

        if (enviando) return;

        const dataMovimiento = {
            ...formulario,
            productos:[
                {
                    id:formulario.producto, 
                    cantidad:1
                }
            ],
            bodega:formulario.bodega,
            fechaMovimiento:formulario.fechaMovimiento
        };

        setEnviando(true);
        try {
            await api("api/activo/create/","POST",data);
            await api("api/movimiento/create/", "POST", dataMovimiento);
            cargarActivos();
            NotifySuccess("Activo Registrado.");

        } catch (error) {
            console.log(error);
            NotifyError("Error al registrar activo.");

        } finally{
            setEnviando(false);
        }
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormulario(prev => ({
            ...prev,
            [name]:value
        }));
    };

    const limpiarFormulario = () => {
        setFormulario({});
    }

    const handleOnClick = () => {
        if (!formulario?.producto) {
            NotifyError("Debe seleccionar un producto.");
            return;
        }

        const existe = activos.some((a) => a.numeroInventario === formulario.numeroInventario);
        if (existe) {
            NotifyError("Error, el numero de inventario ya existe.");
            return;
        }
        addActivo(formulario);

    };

    return (
        <>
            <div className="d-flex align-items-start">
                <button className="btn btn-arrow-light blue-title" onClick={() => navigate(-1)}>
                    <ArrowLeft size={28}/>
                </button>
                <h2 className="mb-4 blue-title">Registrar Activo</h2>
            </div>

            <SelectProductoButton formulario={formulario} setMostrarModal={setMostrarModal} productos={productos}/>

            {mostrarModal && (
                <SelectProductoTable
                    setFormulario={setFormulario}
                    productos={productos}
                    setMostrarModal={setMostrarModal}
                    loading={loading}
                    bodegas={bodegas}
                    formulario={formulario}
                />
            )}

            <div className="card shadow-sm mb-4">
                <div className="card-header fw-semibold bg-blue">
                    Identificación
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        <div className="col-md-6">
                            <label>Nro de inventario</label>
                            <input 
                                className="form-control" 
                                placeholder="N° Inventario"
                                value={formulario?.numeroInventario}
                                name="numeroInventario"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Nro de serie</label>
                            <input 
                                className="form-control" 
                                placeholder="N° Serie"
                                value={formulario?.numeroSerie}
                                name="numeroSerie"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header fw-semibold bg-blue">
                    Asignación
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        <div className="col-md-3">
                            <label>Ubicacion</label>
                            <input 
                                className="form-control" 
                                placeholder="Ubicacion"
                                value={formulario?.ubicacion}
                                name="ubicacion"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label>Usuario</label>
                            <input 
                                className="form-control" 
                                placeholder="Usuario"
                                value={formulario?.usuario}
                                name="usuario"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label>Cargo</label>
                            <input 
                                className="form-control" 
                                placeholder="Cargo"
                                value={formulario?.cargo}
                                name="cargo"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label>Fecha Movimiento</label>
                            <input 
                                type="date"
                                className="form-control" 
                                placeholder="Fecha movimiento"
                                value={formulario?.fechaMovimiento}
                                name="fechaMovimiento"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>
                        <div className="d-flex justify-content-start gap-2">
                            <button 
                                className="btn btn-primary d-flex align-items-center rounded-1 w-auto"
                                disabled={enviando}
                                onClick={handleOnClick}
                            >
                                {enviando ? (
                                    <>
                                        <span 
                                            className="spinner-border spinner-border-sm me-2" 
                                            role="status" 
                                            aria-hidden="true"
                                        ></span>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                    <Plus size={24} className="me-1" />
                                    Registrar Activo
                                    </>
                                )}
                            </button>
                            <button className="btn-light-hover w-auto" onClick={limpiarFormulario}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActivoForm;
