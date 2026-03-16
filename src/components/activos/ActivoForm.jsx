import { useNavigate } from "react-router-dom";
import api from "../../services/Api";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import { useEffect, useState } from "react";
import ProductoActivoForm from "./ProductoActivoForm";
import SelectProducto from "./SelectProducto";
import { ArrowLeft } from "react-bootstrap-icons";

const ActivoForm = () => {
    const [formulario, setFormulario] = useState();
    const [activos, setActivos] = useState([]);
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=> {
        cargarActivos();
    }, []);

    const cargarActivos = async () => {
        try {
            const response = await api("api/activo/list/");
            setActivos(await response.json());

        } catch (error) {
            console.error(error);
        }
    }
    
    const addActivo = async (data) => {
        try {
            await api("api/activo/create/","POST",data);
            NotifySuccess("Activo Registrado.");
            cargarActivos();
        } catch (error) {
            console.log(error);
            NotifyError("Error al registrar activo.");
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
        if (!formulario?.activo) {
            NotifyError("Debe seleccionar un producto.");
            return;
        }
        if (!formulario.fechaEntrega){
            NotifyError("ingrese el fecha de entrega");
            return;
        }

        const existe = activos.some((a)=> a.numeroInventario === formulario.numeroInventario);
        if (existe) {
            NotifyError("Error, el numero de inventario ya existe.");
            return;
        }

        addActivo(formulario);
            
    };

    return (
        <div className="container py-4" style={{ maxWidth: "70rem" }}>
            <div className="d-flex gap-3">
                <button className="d-flex gap-2 align-items-center btn btn-outline-secondary mb-4" onClick={()=> navigate(-1)}>
                    <ArrowLeft/>
                    Volver
                </button>
                <h2 className="mb-4 blue-title">Registrar Activo</h2>
            </div>
            
            <ProductoActivoForm/>

            <SelectProducto setFomulario={setFormulario} formulario={formulario}/>
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
                                value={formulario?.numeroInventario || ""}
                                name="numeroInventario"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label>Nro de serie</label>
                            <input 
                                className="form-control" 
                                placeholder="N° Serie"
                                value={formulario?.numeroSerie || ""}
                                name="numeroSerie"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
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
                                value={formulario?.ubicacion || ""}
                                name="ubicacion"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label>Usuario</label>
                            <input 
                                className="form-control" 
                                placeholder="Usuario"
                                value={formulario?.usuario || ""}
                                name="usuario"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label>Cargo</label>
                            <input 
                                className="form-control" 
                                placeholder="Cargo"
                                value={formulario?.cargo || ""}
                                name="cargo"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label>Fecha de entrega</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={formulario?.fechaEntrega || ""}
                                name="fechaEntrega"
                                onChange={(e)=> handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary" onClick={limpiarFormulario}>
                    Cancelar
                </button>

                <button className="btn btn-primary" onClick={handleOnClick}>
                    Registrar Activo
                </button>
            </div>
        </div>
    )
}
export default ActivoForm;
