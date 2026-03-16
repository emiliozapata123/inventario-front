import BodegaForm from "../components/bodega/BodegaForm";
import BodegaList from "../components/bodega/BodegaList";
import api from "../services/Api";
import { NotifySuccess, NotifyError } from "../components/notify/Notify";
import { useState, useEffect } from "react";
import ModalEliminar from "../components/layout/ModalEliminar";
import Loading from "../components/layout/Loading";

const BodegaPage = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [bodegas, setBodegas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bodega, setBodega] = useState({});
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
        try {
            await api("api/bodega/form/","POST",data);
            getBodegas();
            NotifySuccess("Bodega agregado.");

        } catch (error) {
            console.error(error)
        }
    }

    const updateBodega = async (id,data) => {
        try {
            await api(`api/bodega/${id}/update/`,"PUT",data);
            getBodegas();
            NotifySuccess("Nombre de bodega actualizado.");
            
        } catch (error) {
            console.error(error);
        }
    }

    const bodegaDelete =  async (id) => {
        try {
            await api(`api/bodega/${id}/delete/`,"DELETE");
            getBodegas();
            setMostrarModal(false);

        } catch (error) {
            console.error(error)
            setMostrarModal(false);
            NotifyError("Error, la bodega tiene inventario.");
        }
    }

    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión de Bodegas</h4>
                    <p className="text-muted mb-0">
                        Administra todas las bodegas de la plataforma
                    </p>
                </div>
                    
            </div>

            <section className="card border-0 shadow-sm p-2 ms-3 me-3">
                <div className="row">
                    <div className="col-md-5">
                        <div className="mb-2 position-relative">
                            <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Buscar Bodegas..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <BodegaForm addBodega={addBodega}/>
                    </div>
                </div>

                <div className="card table-responsive">
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
                                busquedaBodegas.map(b => (
                                    <BodegaList 
                                        key={b.id} 
                                        bodega={b} 
                                        setMostrarModal={(action)=> {setMostrarModal(action); setBodega(b)}}
                                        setEditandoId={setEditandoId}
                                        editandoId={editandoId}
                                        onUpdate={updateBodega}
                                    />
                                )))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            
            {mostrarModal === "delete" && (
                <ModalEliminar message={"Bodega"} data={bodega} setMostrarModal={setMostrarModal} handleDelete={bodegaDelete}/>
            )}
        </>
    )
}
export default BodegaPage;