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
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [busqueda, setBusqueda] = useState({
        producto:"",
        bodega:""
    });

    useEffect(()=> {
        getInventario();
    }, []);


    const actualizarBusqueda = (name,value) => {
        setBusqueda((prev) => ({
            ...prev,
            [name]:value
        }));
    } 
    
    const busquedaInventario = inventario?.filter((i) => {
        if (!busqueda) return true;

        const productoLower = busqueda?.producto.toLowerCase().trim();
        const producto = i.producto.nombre.toLowerCase().includes(productoLower);

        const bodega = i.bodega.nombre.includes(busqueda?.bodega);

        return producto && bodega;
    });

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
        if (enviando) return;

        setEnviando(true);
        try {
            await api("api/inventario/ingresar/producto/","POST",data);
            setMostrarModal(false);
            getInventario();
            NotifySuccess("stock de inventario actualizado.");
        } catch (error) {
            console.error(error);  

        } finally {
            setEnviando(false);
        }
    }

    return(
        <div className="pt-4 m-auto" style={{maxWidth:"77rem"}}>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Gestión Inventario de Bodegas</h4>
                    <p className="text-muted mb-0">
                        Administra todo el inventario de las bodegas
                    </p>
                </div>
                <NavLink to={"/home/inventario/ingresar/producto"}
                    className="btn btn-primary"
                    >
                    <i className="bi bi-plus-lg me-2"></i>
                    Ingresar Producto
                </NavLink>
            </div>

            <section className="card border-0 shadow-sm p-2">
                <FiltroInventario actualizarBusqueda={actualizarBusqueda} busqueda={busqueda}/>

                <div className="card shadow-sm table-responsive table-scroll-y">
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
                                        <td colSpan="5" className="text-center py-4 text-muted">
                                            No hay productos en el inventario de bodega
                                        </td>
                                    </tr>
                                ):(
                                    busquedaInventario.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-muted">
                                                No se encontraron productos
                                            </td>
                                        </tr>
                                    ):(
                                        busquedaInventario?.map((i)=> (
                                        <InventarioList
                                            key={i.id}
                                            item={i}
                                            setMostrarModal={(data)=> {setMostrarModal(true); setInventarioSelect(data)}}
                                            
                                        />
                                    )))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {mostrarModal && (
                <ActualizarStockForm item={inventarioSelect} enviando={enviando} setMostrarModal={setMostrarModal} actualizarStock={actualizarStock}/>
            )}
        </div>
    )
}
export default InventarioPage;