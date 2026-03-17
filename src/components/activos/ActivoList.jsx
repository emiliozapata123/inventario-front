import { useEffect, useState } from "react";
import { NotifyError } from "../notify/Notify";
import { Save, X} from "react-bootstrap-icons";

const ActivoList = ({ activo, onUpdate, setEditandoId, editandoId, enviando }) => {
    const [formulario, setFormulario] = useState({});

    useEffect(()=> {
        if (editandoId === activo.id) {
            setFormulario(activo);
        }
    }, [editandoId,activo]);


    const iniciarEdicion = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormulario((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    const guardarEdicion = () => {
        const campos = [
            "numeroInventario",
            "numeroSerie",
            "ubicacion",
            "usuario",
            "cargo",
            "fechaEntrega",
        ];

        for (let campo of campos) {

            const valorOriginal = activo[campo];
            const valorNuevo = formulario[campo];

            //si antes tenia algun dato y ahora queda vacio manda error
            if (valorOriginal && !valorNuevo?.trim()) {
                NotifyError(`El campo ${campo} no puede quedar vacío`);
                return;
            }
        }

        const data = {...formulario}
        delete data.activo;

        onUpdate(editandoId,data);
    }

    const cancelarEdicion = () => {
        setEditandoId(null);
    }

    return (
        <tr>
            <td className="wrap-text">
                {activo?.activo.tipoProducto}
            </td>
            <td className="wrap-text">
                
                {!activo?.activo.descripcion?"Sin descripcion":activo.activo.descripcion}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                       type="text"
                       name="numeroInventario"
                       className="form-control p-1"
                       value={formulario.numeroInventario}
                       onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.numeroInventario?"N/A":activo.numeroInventario
                )}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="numeroSerie"
                        className="form-control p-1"
                        value={formulario.numeroSerie}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.numeroSerie?"Sin nro serie":activo.numeroSerie
                )}
            </td>
            <td>
                {!activo?.activo.marca?"Sin marca":activo.activo.marca}
            </td>
            <td>
                
                {!activo?.activo.modelo?"Sin modelo":activo.activo.modelo}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="ubicacion"
                        className="form-control p-1"
                        value={formulario.ubicacion}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.ubicacion?"Sin ubicacion":activo.ubicacion
                )}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="usuario"
                        className="form-control p-1"
                        value={formulario.usuario}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo.usuario?"Por definir":activo.usuario

                )}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="cargo"
                        className="form-control p-1"
                        value={formulario.cargo}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.cargo?"Sin cargo":activo.cargo

                )}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                        type="date"
                        name="fechaEntrega"
                        className="form-control p-1"
                        value={formulario.fechaEntrega}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    activo.fechaEntrega
                )}
            </td>
            <td>
                <div className="d-flex gap-2 justify-content-center">
                    {editandoId === activo.id ? (
                        <>  <button
                                className="btn btn-success btn-sm"
                                disabled={enviando}
                                onClick={guardarEdicion}
                            >
                                {enviando ? (
                                    <span 
                                        className="spinner-border spinner-border-sm me-2" 
                                        role="status" 
                                        aria-hidden="true"
                                    ></span>
                                ):(
                                    <>
                                    <Save size={24}/>
                                    </>
                                )}
                            </button>

                            <button className="btn btn-outline-danger btn-sm" onClick={cancelarEdicion}>
                                <X size={24}/>
                            </button>
                        </>
                        
                    ):(
                        <button className="btn btn-warning d-flex gap-2" onClick={()=> setEditandoId(activo.id)}>
                            <i className="bi bi-pencil"></i>
                        </button>
                    )}
                    
                </div>
                
            </td>
        </tr>
    )
}
export default ActivoList;