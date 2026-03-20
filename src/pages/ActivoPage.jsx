import { useState, useEffect } from "react";
import api from "../services/Api";
import { NavLink } from "react-router-dom";
import ActivoList from "../components/activos/ActivoList";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import Loading from "../components/layout/Loading";
import FiltrosActivosAsignados from "../components/activos/FiltroActivosAsignados";

const ActivoPage = () => {
    const [activos, setActivos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [filtros, setFiltros] = useState({
       busqueda:"",
       fecha:"",
       numero:"",
       usuario:"",
       cargo:"",
       ubicacion:""
    });


    useEffect(()=> {
        getActivos();
    },[]);

    const actualizarFiltro = (name,value) => {
        setFiltros((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    const filtrarActivos = activos.filter((a) => {
        const lista = [
            a.activo?.tipoProducto.toLowerCase(),
            a?.numeroInventario?.toLowerCase(),
            a?.numeroSerie?.toLowerCase(),
            a?.usuario?.toLowerCase(),
            a?.cargo?.toLowerCase(),
            a?.ubicacion?.toLowerCase()
        ];

        let encontrado = false;

        for (let i = 0; i<lista.length; i++) {
            const value = lista[i];

            if (value && value.includes(filtros?.busqueda.toLowerCase().trim())) {
                encontrado = true;
                break;
            }
        }

        const fecha = a.fechaEntrega.includes(filtros.fecha);

        let cumple = true;

        if (filtros?.usuario === "con usuario") {
            if (!a.usuario) {
                cumple = false;
            }
        }
        if (filtros?.usuario === "sin usuario") {
            if (a.usuario) {
                cumple = false;
            }
        }
        if (filtros?.cargo === "con cargo") {
            if (!a.cargo) {
                cumple = false;
            }
        }
        if (filtros?.cargo === "sin cargo") {
            if (a.cargo) {
                cumple = false;
            }
        }
        if (filtros?.ubicacion === "con ubicacion") {
            if (!a.ubicacion) {
                cumple = false;
            }
        }
        if (filtros?.ubicacion === "sin ubicacion") {
            if (a.ubicacion) {
                cumple = false;
            }
        }
        if (filtros?.numero === "con numero") {
            if (!a.numeroInventario) {
                cumple = false;
            }
        }
        if (filtros?.numero === "sin numero") {
            if (a.numeroInventario) {
                cumple = false;
            }
        }

        if (encontrado && cumple && fecha) return true;
        return false;
    });

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
        
        setEnviando(false);
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
        <div className="pt-4 m-auto">
            <div className="d-flex justify-content-between align-items-center flex-wrap flex gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión de Activos</h4>
                    <p className="text-muted mb-0">
                        Administra todos los filtrarActivos de la plataforma
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <NavLink
                        to={"/home/activos/resumen"}
                        className="btn btn-success"
                        >
                        Ver resumen Activos
                    </NavLink>
                    <NavLink
                        to={"/home/activos/registrar"}
                        className="btn btn-primary"
                        >
                        <i className="bi bi-plus-lg me-2"></i>
                        Registrar Activo
                    </NavLink>
                </div>
            </div>
            <section className="card border-0 shadow-sm p-2">
                <FiltrosActivosAsignados 
                    filtros={filtros} 
                    actualizarFiltro={actualizarFiltro} 
                />

                <div className="card table-responsive table-scroll-y">
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
                                filtrarActivos?.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="text-center py-4 text-muted">
                                            No hay Activos
                                        </td>
                                    </tr>
                                ):(
                                    filtrarActivos?.map(a => (
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