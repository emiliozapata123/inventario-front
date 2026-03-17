import { useEffect, useState } from "react";
import ProductoForm from "../components/producto/ProductoForm";
import ProductoList from "../components/producto/ProductoList";
import "../components/producto/Producto.css";
import api from "../services/Api";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import ModalEliminar from "../components/layout/ModalEliminar";
import "../index.css";
import Loading from "../components/layout/Loading";

const ProductoPage = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);

    useEffect(()=> {
        getProductos();
    },[]);

    useEffect(()=> {
        if (!mostrarModal) setProducto({});
    }, [mostrarModal]);

    const busquedaProductos = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    const getProductos = async () => {
        setLoading(true);

        try {
            const response = await api("api/producto/list/");
            const data = await response.json()
            setProductos(data);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const addProducto = async (data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api("api/producto/form/","POST",data);
            getProductos();
            setMostrarModal(false);
            NotifySuccess("Producto agregado.");

        } catch (error) {
            console.error(error);

        } finally {
            setEnviando(false);
        }
    }

    const updateProducto = async (id,data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api(`api/producto/${id}/update/`,"PATCH",data);
            getProductos();
            setMostrarModal(false);
            NotifySuccess("Producto actualizado.")
        } catch (error) {
            console.error(error);
        } finally {
            setEnviando(false);
        }
    }
    const productoDelete =  async (id) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api(`api/producto/${id}/delete/`,"DELETE");
            getProductos();
            setMostrarModal(false);
            NotifySuccess("Producto eliminado correctamente.");

        } catch (error) {
            console.error(error);
            NotifyError("Error, El producto tiene stock en el inventario.");
        } finally {
            setEnviando(false);
        }
    }

    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestion de Productos</h4>
                    <p className="text-muted mb-0">
                        Administra los productos de la plataforma
                    </p>
                </div>

                <button
                    className="btn btn-primary d-flex align-items-center gap-2 px-3"
                    onClick={() => setMostrarModal("form")}
                    >
                    <i className="bi bi-plus-lg"></i>
                    Nuevo Producto
                </button>
            </div>
            <section className="card border-0 shadow-sm p-2 ms-3 me-3">
                <div className="mb-2 position-relative">
                <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                    <i className="bi bi-search"></i>
                </span>
                <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Buscar Productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                </div>
                <div className="card table-responsive" style={{maxHeight:"31rem",overflow:"auto"}}>
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-blue text-center">
                            <tr>
                                <th>Producto</th>
                                <th>Descripcion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                                productos.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-muted">
                                        No hay productos
                                    </td>
                                </tr>
                                ):(
                                busquedaProductos.map(p => (
                                    <ProductoList 
                                        key={p.id} 
                                        producto={p} 
                                        setMostrarModal={(action)=> {setMostrarModal(action); setProducto(p)}}
                                    />
                                )))
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </section>
            {(mostrarModal === "form" || mostrarModal === "update") &&  (
                <ProductoForm 
                    setMostrarModal={setMostrarModal} 
                    addProducto={addProducto} 
                    updateProducto={updateProducto} 
                    producto={producto}
                    action={mostrarModal}
                    enviando={enviando}
                />
            )}
            {mostrarModal === "delete" && (
                <ModalEliminar 
                    message={"Producto"} 
                    data={producto} 
                    setMostrarModal={setMostrarModal} 
                    onDelete={productoDelete}
                    enviando={enviando}
                />
            )}
        </>
    )
} 
export default ProductoPage;