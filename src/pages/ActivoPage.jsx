import { useState, useEffect } from "react";
import api from "../services/Api";
import { NavLink } from "react-router-dom";
import ActivoList from "../components/activos/ActivoList";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import Loading from "../components/layout/Loading";
import FiltrosActivosAsignados from "../components/activos/FiltroActivosAsignados";
import ModalEliminar from "../components/layout/ModalEliminar";
import { startTransition } from "react";

const ActivoPage = () => {
    const [filtros, setFiltros] = useState({
       busqueda:"",
       numero:"",
       usuario:"",
       cargo:"",
       ubicacion:""
    });
    const [activos, setActivos] = useState([]);
    const [activo, setActivo] = useState({});
    const [editandoId, setEditandoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;
    const indexInicio = (paginaActual - 1) * itemsPorPagina;
    const indexFin = indexInicio + itemsPorPagina;

    useEffect(()=> {
        getActivos();
    }, []);

    const handleBusqueda = (name, value) => {
        startTransition(() => {
            setFiltros((prev) => ({
                ...prev,
                [name]:value
            }));
            setPaginaActual(1);
        });
    };

    

    const filtrarActivos = activos.filter((a) => {
        const lista = [
            a?.producto?.nombre.toLowerCase(),
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

        if (encontrado && cumple) return true;
        return false;
    });

    const activosPaginados = filtrarActivos.slice(indexInicio, indexFin);
    const totalPaginas = Math.ceil(filtrarActivos.length / itemsPorPagina);

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

    const updateActivo = async (id, data) => {
        const listaActivos = [...activos];

        setActivos(prev => prev.map(a => a.id === id 
            ? { ...a, ...data }
            : a
        ));

        if (enviando) return;
        
        setEnviando(true);

        try {
            await api(`api/activo/${id}/update/`,"PATCH", data);
            NotifySuccess("Activo actualizado correctamente.");
            setEditandoId(null);

        } catch (error) {
            console.error(error)
            NotifyError("Error al actualizar activo");
            setActivos(listaActivos);

        } finally {
            setEnviando(false);
        }
    }

    const deleteActivo = async (id) => {
        const listaActivos = [...activos];

        setActivos(prev => prev.filter(p => p.id !== id));

        if (eliminando) return;

        setEliminando(true);
        try {
            await api(`api/activo/${id}/delete/`, "DELETE");
            NotifySuccess("Activo eliminado correctamente.");
            setMostrarModal(false);

        } catch (error) {
            console.error(error);
            NotifyError("Error al eliminar activo.");
            setActivos(listaActivos);

        } finally {
            setEliminando(false);
        }
    }

    return(
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap flex gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión de Activos</h4>
                    <p className="text-muted mb-0">
                        Administra todos los filtrarActivos de la plataforma
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <NavLink
                        to={"/home/activos/registrar"}
                        className="btn btn-primary rounded-1"
                        >
                        <i className="bi bi-plus-lg me-2"></i>
                        Registrar Activo
                    </NavLink>
                </div>
            </div>
            <section className="card border-0 shadow-sm p-2">
                <FiltrosActivosAsignados 
                    filtros={filtros} 
                    actualizarFiltro={handleBusqueda} 
                />

                <div className="table-responsive table-scroll-y">
                    <table className={`table ${!editandoId?"table-hover":""} align-middle mb-0`}>
                        <thead className="bg-blue">
                            <tr>
                                <th className="text-nowrap">Producto</th>
                                <th>Descripcion</th>
                                <th className="text-nowrap">N° Inventario</th>
                                <th className="text-nowrap">N° Serie</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Ubicacion</th>
                                <th>Usuario</th>
                                <th>Cargo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="10" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                                filtrarActivos?.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center py-4 text-muted">
                                            No hay Activos
                                        </td>
                                    </tr>
                                ):(
                                    activosPaginados?.map(a => (
                                    <ActivoList
                                        key={a.id} 
                                        activo={a} 
                                        editandoId={editandoId}
                                        setEditandoId={setEditandoId}
                                        onUpdate={updateActivo}
                                        enviando={enviando}
                                        setMostrarModal={()=> {setMostrarModal(true); setActivo(a)}}
                                    />
                                )))
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
                        <button
                            className="btn btn-outline-primary"
                            disabled={paginaActual === 1}
                            onClick={() => setPaginaActual(prev => prev - 1)}
                        >
                            {"<"}
                        </button>

                        {paginaActual > 2 && (
                            <>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setPaginaActual(1)}
                                >
                                    1
                                </button>

                                {paginaActual > 3 && <span className="px-2">...</span>}
                            </>
                        )}

                        {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                            .filter(num => 
                                num >= paginaActual - 1 && num <= paginaActual + 1
                            )
                            .map(num => (
                                <button
                                    key={num}
                                    className={`btn ${paginaActual === num ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setPaginaActual(num)}
                                >
                                    {num}
                                </button>
                            ))}

                        {paginaActual < totalPaginas - 1 && (
                            <>
                                {paginaActual < totalPaginas - 2 && <span className="px-2">...</span>}

                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setPaginaActual(totalPaginas)}
                                >
                                    {totalPaginas}
                                </button>
                            </>
                        )}

                        <button
                            className="btn btn-outline-primary"
                            disabled={paginaActual === totalPaginas}
                            onClick={() => setPaginaActual(prev => prev + 1)}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </section>
            {mostrarModal && (
                <ModalEliminar data={activo} message={"Activo"} setMostrarModal={setMostrarModal} onDelete={deleteActivo} enviando={eliminando}/>
            )}
        </>
    )
}
export default ActivoPage;