import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MovimientoList from "../components/movimiento/MovimientoList";
import api from "../services/Api";
import FiltroMovimientos from "../components/movimiento/FiltroMovimientos";
import Loading from "../components/layout/Loading";

const MovimientoPage = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [tipoMovimiento, setTipoMovimiento] = useState("");
    const [porBodega, setPorBodega] = useState("");
    const [porFecha, setPorFecha] = useState("");
    const [movFiltrado, setMovFiltrado] = useState([]);
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> {
        cargarMovimientos();
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> {
        const fecha = movimientos.filter((m)=> m.movimiento.fecha.includes(porFecha));
        const tipo = fecha.filter((m)=> m.movimiento.tipo.includes(tipoMovimiento));
        const bodega = tipo.filter((t)=> t.movimiento.bodega.nombre.includes(porBodega));
        setMovFiltrado(bodega);
    }, [tipoMovimiento,porBodega,movimientos,porFecha]);

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
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <div>
                <h4 className="fw-bold mb-1 blue-title">Gestion de Movimientos</h4>
                <p className="text-muted mb-0">
                    Historial de movimientos
                </p>
                </div>
                <NavLink to={"/home/movimiento/form"} className="btn btn-primary d-flex gap-1 align-items-center">
                    <i className="bi bi-plus-lg"></i>
                    Registrar Consumo
                </NavLink>
            </div>

            <section className="card border-0 shadow-sm p-2 ms-3 me-3">                
                <FiltroMovimientos 
                    setPorFecha={setPorFecha} 
                    setTipoMovimiento={setTipoMovimiento} 
                    setPorBodega={setPorBodega}
                    porBodega={porBodega}
                    porFecha={porFecha}
                    tipoMovimiento={tipoMovimiento}
                />
                <div className="card shadow-sm table-responsive table-scroll-filters">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-blue">
                            <tr>
                                <th>Fecha</th>
                                <th className="text-center">Tipo Movimiento</th>
                                <th>Bodega</th>
                                <th>Producto</th>
                                <th className="text-center">Cantidad</th>
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
                                movFiltrado.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No hay movimientos registrados
                                        </td>
                                    </tr>
                                ):(
                                    movFiltrado.map((m)=> (
                                    <MovimientoList movimiento={m}/>
                                )))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
export default MovimientoPage;