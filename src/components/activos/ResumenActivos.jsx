import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";

const ResumenActivos = () => {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        cargarResumen();
    }, []);

    const cargarResumen = async () => {
        setLoading(true);

        try {
            const response = await api("api/activo/resumen/");
            const data = await response.json();
            setEquipos(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <button className="btn btn-outline-secondary" onClick={()=> navigate(-1)}>
                    ← Volver
                </button>
                <h4 className="fw-bold blue-title">Resumen de Activos</h4>

            </div>
            
            <section className="card border-0 shadow-sm p-2 ms-3 me-3">
            <div className="card table-responsive shadow-sm" style={{maxHeight:"36rem",overflow:"auto"}}>

                <table className="table table-hover">
                    <thead className="bg-blue">
                        <tr>
                            <th>Tipo de Producto</th>
                            <th className="text-center">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="2" className="text-center py-5">
                                    <Loading/>
                                </td>
                            </tr>
                        ):(
                        equipos.map((e, index) => (
                            <tr key={index}>
                                <td>{e?.activo__tipoProducto}</td>
                                <td className="text-center fw-bold">
                                    {e?.cantidad}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            </section>
        </>
        
    );
};

export default ResumenActivos;