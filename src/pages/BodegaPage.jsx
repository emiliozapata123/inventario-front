import BodegaForm from "../components/bodega/BodegaForm";
import BodegaList from "../components/bodega/BodegaList";
import api from "../services/Api";
import { NotifySuccess, NotifyError } from "../components/notify/Notify";
import { useState, useEffect } from "react";
import ModalEliminar from "../components/layout/ModalEliminar";
import Loading from "../components/layout/Loading";
import Busqueda from "../components/layout/Busqueda";

const BodegaPage = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [bodegas, setBodegas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bodega, setBodega] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [editando, setEditando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(()=> {
        getBodegas();
    }, []);


    const busquedaBodegas = bodegas.filter((b)=> b.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    const getBodegas = async () => {
        setLoading(true);

        try {
            const response = await api("api/bodega/list/");
            const data = await response.json()
            setBodegas(data);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    
    const addBodega = async (data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api("api/bodega/form/","POST",data);
            getBodegas();
            NotifySuccess("Bodega agregado.");

        } catch (error) {
            console.error(error)
        } finally {
            setEnviando(false);
        }
    }

    const updateBodega = async (id,data) => {
        if (editando) return;

        setEditando(true);
        try {
            await api(`api/bodega/${id}/update/`,"PUT",data);
            setEditandoId(null);
            getBodegas();
            NotifySuccess("Nombre de bodega actualizado.");
            
        } catch (error) {
            console.error(error);
        } finally {
            setEditando(false);
        }
    }

    const bodegaDelete =  async (id) => {
        if (eliminando) return;

        setEliminando(true);
        try {
            await api(`api/bodega/${id}/delete/`,"DELETE");
            getBodegas();
            NotifySuccess("Bodega Eliminado.");
            setMostrarModal(false);

        } catch (error) {
            console.error(error)
            setMostrarModal(false);
            NotifyError("Error, la bodega tiene inventario.");
        } finally {
            setEliminando(false);
        }
    }

    return(
        <div className="pt-4 m-auto" style={{maxWidth:"77rem"}}>
            <div className="d-flex flex-column align-items-start mb-4">
                <h4 className="fw-bold mb-1 blue-title">Gestión de Bodegas</h4>
                <p className="text-muted mb-0">
                    Administra todas las bodegas de la plataforma
                </p>
            </div>
            <section className="card border-0 shadow-sm p-2">
                <div className="row g-2">
                    <div className="col-md-5">
                        <Busqueda setBusqueda={setBusqueda} busqueda={busqueda}/>
                    </div>
                    <div className="col-md-7">
                        <BodegaForm addBodega={addBodega} enviando={enviando}/>
                    </div>
                </div>

                <div className="card table-responsive table-scroll-y">
                    <table className={`table ${!editandoId?"table-hover":""} align-middle mb-0`}>
                        <thead className="bg-blue">
                            <tr>
                                <th>Nombre</th>
                                <th className="text-center">Total Productos</th>
                                <th className="text-center">Items Totales</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                                bodegas.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-muted">
                                            No hay bodegas registradas
                                        </td>
                                    </tr>
                                ):(
                                    busquedaBodegas.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-muted">
                                                No se encontraron bodegas
                                            </td>
                                        </tr>
                                    ):(
                                        busquedaBodegas.map(b => (
                                            <BodegaList 
                                                key={b.id} 
                                                bodega={b} 
                                                setMostrarModal={(action)=> {setMostrarModal(action); setBodega(b)}}
                                                setEditandoId={setEditandoId}
                                                editandoId={editandoId}
                                                onUpdate={updateBodega}
                                                editando={editando}
                                            />
                                    
                                        )
                                    )
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            
            {mostrarModal === "delete" && (
                <ModalEliminar 
                    message={"Bodega"} 
                    data={bodega} 
                    enviando={eliminando} 
                    setMostrarModal={setMostrarModal} 
                    onDelete={bodegaDelete}
                />
            )}
        </div>
    )
}
export default BodegaPage;