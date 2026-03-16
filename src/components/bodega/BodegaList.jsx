import { useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { NotifyError } from "../notify/Notify";

const BodegaList = ({bodega, setMostrarModal, onUpdate, setEditandoId, editandoId}) => {
    const [nombre, setNombre] = useState("");

    const iniciarEdicion = () => {
        setEditandoId(bodega.id);
        setNombre(bodega.nombre);
    }

    const cancelarEdicion = () => {
        setNombre("");
        setEditandoId(null);
    }

    const guardarEdicion = () => {
        if (!nombre.trim()) {
            NotifyError("el nombre no puede quedar vacio.");
            return;
        }
        onUpdate(editandoId,{nombre});
        cancelarEdicion();
    }

    return (
        <tr>
            <td>
                {editandoId === bodega.id ? (
                    <input
                        className="form-control p-1"
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                    />
                ):(
                    bodega?.nombre
                )}
            </td>
            <td className="text-center">{bodega?.totalProductos}</td>
            <td className="text-center">{bodega?.totalItems}</td>
            <td>
                {editandoId === bodega.id ? (
                    <div className="d-flex gap-1 justify-content-center">
                        <button onClick={guardarEdicion} className="btn btn-warning d-flex gap-1 align-items-center">
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={cancelarEdicion} className="btn btn-outline-danger d-flex gap-1 align-items-center">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                ):(
                <div className="d-flex gap-1 justify-content-center">
                    <button onClick={iniciarEdicion} className="btn btn-warning d-flex gap-1 align-items-center">
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button onClick={()=> setMostrarModal("delete")} className="btn btn-danger d-flex gap-1 align-items-center">
                        <i className="bi bi-trash"></i>
                    </button>
                    <NavLink to={`/home/bodega/${bodega?.id}`} className="btn btn-success d-flex gap-1 align-items-center">
                        <Eye size={16}/>
                    </NavLink>
                </div>
                )}
                
            </td>
        </tr>
    )
}
export default BodegaList;