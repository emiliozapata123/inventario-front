import { Pencil, Save, Trash, X } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { NotifyError } from "../notify/Notify";

const ProcuctoActivoRow = ({producto, setEditandoId, editandoId, onUpdate, enviando, setMostrarModal}) => {
    const [formulario, setFormulario] = useState({});

    useEffect(()=> {
        setFormulario(producto);

    }, [producto,editandoId]);

    
    const iniciarEdicion = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormulario(prev => ({
            ...prev,
            [name]:value
        }));
    }

    const cancelarEdicion = () => {
        setFormulario({});
        setEditandoId(null);
    } 

    const guardarEdicion = () => {
        const campos = [
            "tipoProducto",
            "descripcion",
            "marca",
            "modelo"
        ];

        for (let campo of campos) {
    
            const valorOriginal = producto[campo];
            const valorNuevo = formulario[campo];

            //si antes tenia algun dato y ahora queda vacio manda error
            if (valorOriginal && !valorNuevo?.trim()) {
                NotifyError(`El campo ${campo} no puede quedar vacío`);
                return;
            }
        }

        onUpdate(editandoId,formulario);
    }
    
    return (
        <tr>
            <td>
                {producto?.id === editandoId ? (
                    <input
                        className="form-control p-1"
                        name="tipoProducto"
                        value={formulario?.tipoProducto}
                        onChange={(e)=> iniciarEdicion(e)} 
                    />
                ):(
                    producto?.tipoProducto
                )}
            </td>
            <td>
                {producto?.id === editandoId ? (
                    <input
                        className="form-control p-1"
                        name="descripcion"
                        value={formulario?.descripcion}
                        onChange={(e)=> iniciarEdicion(e)} 
                    />
                ):(
                    !producto?.descripcion?"Sin descripcion":producto.descripcion
                )}
            </td>
            <td className="text-center">
                {producto?.id === editandoId ? (
                    <input
                        className="form-control p-1"
                        name="marca"
                        value={formulario?.marca}
                        onChange={(e)=> iniciarEdicion(e)} 
                    />
                ):(
                    !producto?.marca?<span className="badge bg-light text-dark border">—</span>:producto.marca
                )}
            </td>
            <td className="text-center">
                {producto?.id === editandoId ? (
                    <input
                        className="form-control p-1"
                        name="modelo"
                        value={formulario?.modelo}
                        onChange={(e)=> iniciarEdicion(e)} 
                    />
                ):(
                    !producto?.modelo?<span className="badge bg-light text-dark border">—</span>:producto.modelo
                )}
            </td>
            <td>
                <div className="d-flex justify-content-center gap-1">
                    {producto.id === editandoId ? (
                        <>
                            <button 
                                className="btn btn-success d-flex justify-content-center align-items-center rounded-1"
                                disabled={enviando}
                                onClick={guardarEdicion}
                            >
                                {enviando ? (
                                    <>
                                        <span 
                                            className="spinner-border spinner-border-sm me-2" 
                                            role="status" 
                                            aria-hidden="true"
                                        ></span>
                                        editando...
                                    </>
                                ) : (
                                    <>
                                    <Save size={18} className="me-1"/>
                                    Guardar
                                    </>
                                )}
                            </button>
                            <button className="btn btn-outline-danger d-flex justify-content-center rounded-1" onClick={cancelarEdicion}>
                                <X size={24}/>
                                Cancelar
                            </button>
                        </>
                    ):(
                        <>
                        <button className="d-flex align-items-center gap-1 btn btn-warning rounded-1" onClick={()=> setEditandoId(producto.id)}>
                            <Pencil/>
                            Editar
                        </button>
                        <button className="d-flex align-items-center gap-1 btn btn-danger rounded-1" onClick={setMostrarModal}>
                            <Trash/>
                            Eliminar
                        </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}
export default ProcuctoActivoRow;