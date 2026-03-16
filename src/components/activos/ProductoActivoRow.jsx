import { Pencil, Save, X } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { NotifyError } from "../notify/Notify";

const ProcuctoActivoRow = ({producto, setEditandoId, editandoId, onUpdate}) => {
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
                    !producto?.marca?"Sin marca":producto.marca
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
                    !producto?.modelo?"Sin modelo":producto.modelo
                )}
            </td>
            <td>
                <div className="d-flex justify-content-center gap-1">
                    {producto.id === editandoId ? (
                        <>
                            <button className="btn btn-success" onClick={guardarEdicion}>
                                <Save size={18}/>
                            </button>
                            <button className="btn btn-outline-danger" onClick={cancelarEdicion}>
                                <X size={18}/>
                            </button>
                        </>
                    ):(
                        <button className="d-flex align-items-center gap-2 btn btn-warning" onClick={()=> setEditandoId(producto.id)}>
                            <Pencil/>
                            Editar
                        </button>
                    )}
                    
                </div>
            </td>
        </tr>
    )
}
export default ProcuctoActivoRow;