import { useEffect, useState } from "react";
import { NotifyError } from "../notify/Notify";
import { Save, X} from "react-bootstrap-icons";

const ActivoList = ({ activo, onUpdate, setEditandoId, editandoId, enviando, setMostrarModal }) => {
    const [formulario, setFormulario] = useState({});

    console.log("formulario: ", formulario)

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
        delete data.producto;

        onUpdate(editandoId, data);
    }

    const cancelarEdicion = () => {
        setEditandoId(null);
    }

    return (
        <tr>
            <td className="text-break">
                {activo?.producto?.nombre}
            </td>
            <td className="text-break">
                
                {!activo?.producto?.descripcion?<span className="badge text-dark">—</span>:activo.producto.descripcion}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                       type="text"
                       name="numeroInventario"
                       className="form-control p-1 rounded-1"
                       value={formulario.numeroInventario}
                       onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.numeroInventario?<span className="badge text-dark">—</span>:activo.numeroInventario
                )}
            </td>
            <td>
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="numeroSerie"
                        className="form-control p-1 rounded-1"
                        value={formulario.numeroSerie}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.numeroSerie?<span className="badge text-dark">—</span>:activo.numeroSerie
                )}
            </td>
            <td>
                {!activo?.producto?.marca?<span className="badge text-dark">—</span>:activo.producto.marca}
            </td>
            <td>
                
                {!activo?.producto?.modelo?<span className="badge text-dark">—</span>:activo.producto.modelo}
            </td>
            <td className="text-break">
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="ubicacion"
                        className="form-control p-1 rounded-1"
                        value={formulario.ubicacion}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.ubicacion?<span className="badge text-dark">—</span>:activo.ubicacion
                )}
            </td>
            <td className="text-break">
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="usuario"
                        className="form-control p-1 rounded-1"
                        value={formulario.usuario}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo.usuario?<span className="badge text-dark">—</span>:activo.usuario

                )}
            </td>
            <td className="text-break">
                {editandoId === activo.id ? (
                    <input
                        type="text"
                        name="cargo"
                        className="form-control p-1 rounded-1"
                        value={formulario.cargo}
                        onChange={(e)=> iniciarEdicion(e)}
                    />
                ):(
                    !activo?.cargo?<span className="badge text-dark">—</span>:activo.cargo

                )}
            </td>
            <td>
                <div className="d-flex gap-1 justify-content-center">
                    {editandoId === activo.id ? (
                        <>  <button
                                className="btn btn-success btn-sm"
                                disabled={enviando}
                                onClick={guardarEdicion}
                            >
                                {enviando ? (
                                    <span 
                                        className="spinner-border spinner-border-sm" 
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

                        <>
                        <button className="btn btn-warning d-flex gap-2" onClick={() => setEditandoId(activo.id)}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-danger d-flex gap-2" onClick={setMostrarModal}>
                            <i className="bi bi-trash"></i>
                        </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}
export default ActivoList;