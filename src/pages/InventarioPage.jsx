import { useEffect, useState } from "react";
import InventarioList from "../components/inventario/InventarioList";
import api from "../services/Api";
import { NotifyError, NotifySuccess } from "../components/notify/Notify";
import { NavLink } from "react-router-dom";
import ActualizarStockForm from "../components/inventario/ActualizarStockForm";
import FiltroInventario from "../components/inventario/FiltroInventarios";
import Loading from "../components/layout/Loading";
import { startTransition } from "react";

const InventarioPage = () => {
     const [busqueda, setBusqueda] = useState({
        producto:"",
        bodega:""
    });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [inventario, setInventario] = useState([]);
    const [inventarioSelect, setInventarioSelect] = useState({});
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;
    const indexInicio = (paginaActual -1) * itemsPorPagina;
    const indexFin = indexInicio + itemsPorPagina;

    useEffect(()=> {
        getInventario();
    }, []);

    const handleBusqueda = (name, value) => {
        startTransition(() => {
            setBusqueda((prev) => ({
                ...prev,
                [name]:value
            }));
            setPaginaActual(1);
        });
    };
    
    const busquedaInventario = inventario?.filter((i) => {
        if (!busqueda) return true;

        const productoLower = busqueda?.producto.toLowerCase().trim();
        const producto = i.producto.nombre.toLowerCase().includes(productoLower);

        const bodega = i.bodega.nombre.includes(busqueda?.bodega);

        return producto && bodega;
    });

    const inventarioPaginado = busquedaInventario.slice(indexInicio, indexFin);
    const totalPaginas = Math.ceil(busquedaInventario.length / itemsPorPagina);


    const getInventario = async () => {
        setLoading(true);
        
        try {
            const response = await api("api/inventario/list/");
            setInventario(await response.json());

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    const actualizarStock = async (data) => {
        const listaInventario = [...inventario];

        const id = inventarioSelect.id;
        const cantidad = data.productos[0].cantidad; 

        setInventario(prev => prev.map(i => i.id === id
            ? { ...i, stock: i.stock + cantidad }
            : i
        ));

        if (enviando) return;

        setEnviando(true);
        try {
            await api("api/inventario/ingresar/producto/","POST",data);
            setMostrarModal(false);
            NotifySuccess("stock de inventario actualizado.");

        } catch (error) {
            console.error(error);
            NotifyError("Error al actualizar stock.");  
            setInventario(listaInventario);

        } finally {
            setEnviando(false);
        }
    }

    const abrirModal = (data) => {
        setMostrarModal(true);
        setInventarioSelect(data);

    }

    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión de Inventario</h4>
                    <p className="text-muted mb-0">
                        Administra todo el inventario de la plataforma
                    </p>
                </div>
                <NavLink to={"/home/inventario/ingresar/producto"}
                    className="btn btn-primary rounded-1"
                    >
                    <i className="bi bi-plus-lg me-2"></i>
                    Ingresar Producto
                </NavLink>
            </div>

            <section className="card border-0 shadow-sm p-2">
                <FiltroInventario actualizarBusqueda={handleBusqueda} busqueda={busqueda}/>
                <div className="shadow-sm table-responsive table-scroll-y">
                    <table className="table table-hover mb-0">
                        <thead className="bg-blue">
                            <tr>
                                <th>Producto</th>
                                <th>Descripcion</th>
                                <th>Bodega</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center text-nowrap">Stock Minimo</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                            inventario.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">
                                        No hay productos en el inventario
                                    </td>
                                </tr>
                            ):(
                                inventarioPaginado.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No se encontraron productos
                                        </td>
                                    </tr>
                                ):(
                                    inventarioPaginado?.map((i)=> (
                                    <InventarioList
                                        key={i.id}
                                        item={i}
                                        setMostrarModal={abrirModal}
                                    />
                                )))
                            ))}
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
                <ActualizarStockForm item={inventarioSelect} enviando={enviando} setMostrarModal={setMostrarModal} actualizarStock={actualizarStock}/>
            )}
        </>
    )
}
export default InventarioPage;