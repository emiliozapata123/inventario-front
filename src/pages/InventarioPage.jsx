import { useEffect, useState } from "react";
import InventarioList from "../components/inventario/InventarioList";
import api from "../services/Api";
import { NotifySuccess } from "../components/notify/Notify";
import { NavLink } from "react-router-dom";
import ActualizarStockForm from "../components/inventario/ActualizarStockForm";
import FiltroInventario from "../components/inventario/FiltroInventarios";
import Loading from "../components/layout/Loading";

const InventarioPage = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [inventario, setInventario] = useState([]);
    const [inventarioSelect, setInventarioSelect] = useState({});
    const [porProducto, setPorProducto] = useState("");
    const [porBodega, setPorBodega] = useState("");
    const [inventarioFiltrado, setInventarioFiltrado] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        getInventario();
    }, []);

    useEffect(()=> {
        const busquedaProducto = inventario?.filter((i) => i.producto.nombre.toLowerCase().includes(porProducto.toLowerCase()));
        const productoBodega = busquedaProducto?.filter((b) => b.bodega.nombre.toLowerCase().includes(porBodega.toLowerCase()));

        setInventarioFiltrado(productoBodega);
    }, [porBodega,porProducto,inventario]);


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
        try {
            await api("api/inventario/ingresar/producto/","POST",data);
            getInventario();
            NotifySuccess("stock de inventario actualizado.");
        } catch (error) {
            console.error(error);   
        }
    }

    return(
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión Inventario de Bodegas</h4>
                    <p className="text-muted mb-0">
                        Administra todo el inventario de las bodegas
                    </p>
                </div>
                <NavLink to={"/home/inventario/ingresar/producto"}
                    className="btn btn-primary d-flex align-items-center gap-2 px-3"
                    >
                    <i className="bi bi-plus-lg"></i>
                    Ingresar Producto
                </NavLink>
            </div>

            <section className="card border-0 shadow-sm p-2 ms-3 me-3">
                <FiltroInventario
                    setPorBodega={setPorBodega}
                    setPorProducto={setPorProducto}
                    porBodega={porBodega}
                    porProducto={porProducto}
                />

                <div className="card shadow-sm table-responsive table-scroll-filters">
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="bg-blue">
                                <tr>
                                    <th>Producto</th>
                                    <th>Bodega</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-center">Stock Minimo</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            <Loading/>
                                        </td>
                                    </tr>
                                ):(
                                inventario.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-muted">
                                            No hay productos en el inventario de bodega
                                        </td>
                                    </tr>
                                ):(
                                    inventarioFiltrado?.map((i)=> (
                                        <InventarioList
                                            key={i.id}
                                            item={i}
                                            setMostrarModal={(data)=> {setMostrarModal(true); setInventarioSelect(data)}}
                                            
                                        />
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {mostrarModal && (
                <ActualizarStockForm item={inventarioSelect} setMostrarModal={setMostrarModal} actualizarStock={actualizarStock}/>
            )}
        </div>
    )
}
export default InventarioPage;