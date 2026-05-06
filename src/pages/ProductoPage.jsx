import { useEffect, useState } from "react";
import ProductoForm from "../components/producto/ProductoForm";
import ProductoList from "../components/producto/ProductoList";
import api from "../services/Api";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import ModalEliminar from "../components/layout/ModalEliminar";
import Loading from "../components/layout/Loading";
import Busqueda from "../components/layout/Busqueda";
import SelectFilterProducto from "../components/producto/SelectFilterProducto";
import { startTransition } from "react";

const ProductoPage = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [tipo, setTipo] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;
    const indexInicio = (paginaActual - 1) * itemsPorPagina;
    const indexFin = indexInicio + itemsPorPagina;

    useEffect(()=> {
        getProductos();

    },[]);

    useEffect(()=> {
        if (!mostrarModal) setProducto({});
    }, [mostrarModal]);

    const busquedaProductos = productos.filter((p) => {
        const nombre = p?.nombre?.toLowerCase() || "";
        const tipoProducto = p?.tipo?.toLowerCase().trim() || "";

        const cumpleBusqueda = !busqueda || nombre.includes(busqueda.toLowerCase());
        const cumpleTipo = !tipo || tipo === "Todos" || tipoProducto === tipo.toLowerCase().trim();

        return cumpleBusqueda && cumpleTipo;
    });

    const productosPaginados = busquedaProductos.slice(indexInicio, indexFin);
    const totalPaginas = Math.ceil(busquedaProductos.length / itemsPorPagina);

    const handleBusqueda = (value) => {
        startTransition(() => {
            setBusqueda(value);
            setPaginaActual(1);
        });
    };

    const handleTipo = (value) => {
        setTipo(value);
        setPaginaActual(1);
    };

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
            const res = await api("api/producto/form/","POST",data);
            const nuevoProducto = await res.json();
            setProductos(prev => [...prev, nuevoProducto]);

            setMostrarModal(false);
            NotifySuccess("Producto creado exitosamente.");

        } catch (error) {
            console.error(error);
            NotifyError("Error al crear producto.");

        } finally {
            setEnviando(false);
        }
    }

    const updateProducto = async (id, data) => {
        const listaProductos = [...productos];

        setProductos(prev => prev.map(p => p.id === id 
            ? { ...p, ...data }
            : p
        ));

        if (enviando) return;

        setEnviando(true);
        
        try {
            await api(`api/producto/${id}/update/`,"PATCH", data);
            setMostrarModal(false);
            NotifySuccess("Producto actualizado.");

        } catch (error) {
            console.error(error);
            NotifyError("Error al actualizar producto.");
            setProductos(listaProductos);

        } finally {
            setEnviando(false);
        }
    }
    const productoDelete =  async (id) => {
        const listaProductos = [...productos];

        setProductos(prev => prev.filter(p => p.id !== id));
        if (enviando) return;

        setEnviando(true);
        try {
            await api(`api/producto/${id}/delete/`,"DELETE");
            setMostrarModal(false);
            NotifySuccess("Producto eliminado correctamente.");
        
        } catch (error) {
            console.error(error);
            NotifyError("Error al eliminar producto.");
            setProductos(listaProductos);

        } finally {
            setEnviando(false);
        }
    }

    const abrirModal = (action, p) => {
        setMostrarModal(action);
        setProducto(p);
    }
    
    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestion de Productos</h4>
                    <p className="text-muted mb-0">
                        Administra los productos de la plataforma
                    </p>
                </div>

                <button
                    className="btn btn-primary rounded-1"
                    onClick={() => setMostrarModal("form")}
                    >
                    <i className="bi bi-plus-lg me-2"></i>
                    Nuevo Producto
                </button>
            </div>
            <section className="card shadow-sm border-0 p-2">
                <div className="row g-2 mb-2">
                    <div className="col-md-6">
                        <Busqueda setBusqueda={handleBusqueda} busqueda={busqueda}/>
                    </div>
                    <div className="col-md-6">
                        <SelectFilterProducto
                            value={tipo}
                            setValue={handleTipo}
                        />
                    </div>
                </div>
                <div className="table-responsive table-scroll-y">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-blue">
                            <tr>
                                <th>Producto</th>
                                <th>Descripcion</th>
                                {tipo === "Activo" && (
                                    <th>Marca</th>
                                )}
                                {tipo === "Activo" && (
                                    <th>Modelo</th>
                                )}
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ) : productos.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-muted">
                                        No hay productos
                                    </td>
                                </tr>
                            ) : productosPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-muted">
                                        No se encontraron productos
                                    </td>
                                </tr>
                            ) : productosPaginados?.map(p => (
                                    <ProductoList 
                                        key={p.id} 
                                        producto={p} 
                                        tipo={tipo}
                                        setMostrarModal={abrirModal}
                                    />
                                ))
                            }
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