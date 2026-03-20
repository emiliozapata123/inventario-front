import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../layout/Loading";
import api from "../../services/Api";
import ProcuctoActivoRow from "./ProductoActivoRow";
import { ArrowLeft } from "react-bootstrap-icons";
import { NotifyError, NotifySuccess } from "../notify/Notify";
import ModalEliminar from "../layout/ModalEliminar";


const ProductoActivoList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editandoId, setEditandoId] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        cargarProductos();
    }, []);


    const productosFiltrados = productos?.filter((p) => {
        const busquedaLower = busqueda?.toLowerCase().trim();
        if (!busquedaLower) return true;

        const tipoProducto = p.tipoProducto.toLowerCase().includes(busquedaLower);

        const marca = p.marca?.toLowerCase().includes(busquedaLower);

        return tipoProducto || marca;
    });

    //productos de tipo activos
    const cargarProductos = async () => {
        setLoading(true);

        try {
            const response = await api("api/activo/producto/list/");
            setProductos(await response.json());

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updateProductoActivo = async (id,data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api(`api/activo/producto/${id}/update/`, "PATCH", data);
            NotifySuccess("Producto actualizado correctamente.");
            setEditandoId(null);
            cargarProductos();

        } catch (error) {
            console.error(error);
            NotifyError("Error al actualizar.");
        } finally {
            setEnviando(false);
        }
    }

    const deleteProducto = async (id) => {
        if (eliminando) return;

        setEliminando(true);
        try {
            await api(`api/activo/producto/${id}/delete/`, "DELETE");
            NotifySuccess("Producto eliminado correctamente.");
            setMostrarModal(false);
            cargarProductos();

        } catch (error) {
            console.error(error);
            NotifyError("Error, El producto ya esta asignado.");
        } finally {
            setEliminando(false);
        }
    }


    return (

        <div className="pt-4 m-auto" style={{maxWidth:"75rem"}}>
            <div className="d-flex align-items-center mb-4 flex-wrap gap-3">
                <button className="btn btn-outline-dark" onClick={()=> navigate(-1)}>
                    <ArrowLeft className="me-2"/>
                    Volver
                </button>
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Listado de productos activos</h4>
                    <p className="text-muted mb-0">
                        Administra los productos de la plataforma
                    </p>
                </div>
            </div>
            
            <section className="card border-0 shadow-sm p-2">
                <div className="mb-2 position-relative">
                    <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        type="text"
                        className="form-control ps-5"
                        placeholder="Buscar productos por tipo y marca..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="card table-responsive shadow-sm table-scroll-y">
                    <table className={`table ${!editandoId ? "table-hover":""}`}>
                        <thead className="bg-blue">
                            <tr>
                                <th>Tipo de Producto</th>
                                <th>Descripcion</th>
                                <th className="text-center">Marca</th>
                                <th className="text-center">Modelo</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                                productosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            No se encontraron productos
                                        </td>
                                    </tr>
                                ):(
                                    productosFiltrados?.map((p) => (
                                        <ProcuctoActivoRow 
                                            producto={p}
                                            editandoId={editandoId}
                                            setEditandoId={setEditandoId}
                                            onUpdate={updateProductoActivo}
                                            enviando={enviando}
                                            eliminando={eliminando}
                                            setMostrarModal={()=> {setMostrarModal(true); setProducto(p)}}
                                        />
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {mostrarModal && (
                <ModalEliminar 
                    data={producto}
                    setMostrarModal={setMostrarModal} 
                    onDelete={deleteProducto} 
                    message={"Producto"} 
                    enviando={eliminando}
                />
            )}
        </div>
    )
}
export default ProductoActivoList;