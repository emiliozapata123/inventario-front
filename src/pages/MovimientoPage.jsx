import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MovimientoList from "../components/movimiento/MovimientoList";
import api from "../services/Api";
import FiltroMovimientos from "../components/movimiento/FiltroMovimientos";
import Loading from "../components/layout/Loading";

const MovimientoPage = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [filtros, setFiltros] = useState({
        fecha:"",
        tipo:"",
        bodega:""
    });
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        cargarMovimientos();
    }, []);

    const actualizarFiltro = (name,value) => {

        setFiltros((prev) => ({
            ...prev,
            [name]:value
        }));
    }
   
    const movimientosFiltrados = movimientos?.filter((m) => {
        if (filtros?.fecha && m.movimiento.fechaMovimiento !== filtros?.fecha) return false;

        if (filtros?.tipo && m.movimiento.tipo !== filtros?.tipo) return false;

        if (filtros?.bodega && m.movimiento.bodega.nombre !== filtros?.bodega) return false;
       
        return true;
    });

    const cargarMovimientos = async () => {
        setLoading(true);

        try {
            const response = await api("api/movimiento/list/detail/");
            setMovimientos(await response.json());

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="pt-4 m-auto" style={{maxWidth:"77rem"}}>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                <h4 className="fw-bold mb-1 blue-title">Gestion de Movimientos</h4>
                <p className="text-muted mb-0">
                    Historial de movimientos
                </p>
                </div>
                <NavLink to={"/home/movimiento/form"} className="btn btn-primary rounded-1">
                    <i className="bi bi-plus-lg me-2"></i>
                    Registrar Consumo
                </NavLink>
            </div>

            <section className="card border-0 shadow-sm p-2">                
                <FiltroMovimientos actualizarFiltro={actualizarFiltro} filtros={filtros}/>

                <div className="card shadow-sm table-responsive table-scroll-y">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-blue">
                            <tr>
                                <th className="text-center text-nowrap">Tipo Movimiento</th>
                                <th className="text-nowrap text-center">Fecha Movimiento</th>
                                <th className="text-nowrap text-center">Fecha Entrega</th>
                                <th>Bodega</th>
                                <th>Producto</th>
                                <th className="text-center">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                                movimientosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No hay movimientos registrados
                                        </td>
                                    </tr>
                                ):(
                                    movimientosFiltrados.map((m)=> (
                                    <MovimientoList movimiento={m}/>
                                )))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
export default MovimientoPage;