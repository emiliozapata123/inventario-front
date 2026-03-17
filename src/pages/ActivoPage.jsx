import { useState, useEffect } from "react";
import api from "../services/Api";
import { NavLink } from "react-router-dom";
import ActivoList from "../components/activos/ActivoList";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import Loading from "../components/layout/Loading";

const ActivoPage = () => {
    const [activos, setActivos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);

    useEffect(()=> {
        getActivos();
    },[]);

    const getActivos = async () => {
        setLoading(true);

        try {
            const response = await api("api/activo/list/");
            const data = await response.json()
            setActivos(data);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const updateActivo = async (id,data) => {
        if (enviando) return;
        
        setEnviando(true);
        try {
            await api(`api/activo/${id}/update/`,"PATCH", data);
            setEditandoId(null);
            NotifySuccess("Activo actualizado correctamente.");
            getActivos();

        } catch (error) {
            console.error(error)
            NotifyError("Error al actualizar activo");
        } finally {
            setEnviando(false);
        }
    }

    return(
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión de Activos</h4>
                    <p className="text-muted mb-0">
                        Administra todos los activos de la plataforma
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <div>
                        <NavLink
                            to={"/home/activos/resumen"}
                            className="btn btn-success d-flex align-items-center gap-2 px-3"
                            >
                            Ver resumen activos
                        </NavLink>
                    </div>
                    <div className="d-flex gap-2">
                        <NavLink
                            to={"/home/activos/registrar"}
                            className="btn btn-primary d-flex align-items-center gap-2 px-3"
                            >
                            <i className="bi bi-plus-lg"></i>
                            Registrar Activo
                        </NavLink>
                    </div>
                </div>
                
                
            </div>
            <section className="card border-0 shadow-sm p-2 ms-3 me-3">
                <div className="card table-responsive table-scroll">
                    <table className={`table ${!editandoId?"table-hover":""} align-middle mb-0`}>
                        <thead className="bg-blue">
                            <tr>
                                <th>Tipo Producto</th>
                                <th>Descripcion</th>
                                <th>N° Inventario</th>
                                <th>N° Serie</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Ubicacion</th>
                                <th>Usuario</th>
                                <th>Cargo</th>
                                <th>Fecha Entrega</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="11" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                                activos?.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="text-center py-4 text-muted">
                                            No hay activos
                                        </td>
                                    </tr>
                                ):(
                                    activos?.map(a => (
                                    <ActivoList
                                        key={a.id} 
                                        activo={a} 
                                        editandoId={editandoId}
                                        setEditandoId={setEditandoId}
                                        onUpdate={updateActivo}
                                        enviando={enviando}
                                    />
                                )))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
export default ActivoPage;