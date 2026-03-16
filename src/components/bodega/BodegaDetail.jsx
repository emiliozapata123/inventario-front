import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import Loading from "../layout/Loading";

const BodegaDetail = () => {
    const { id } = useParams();
    const [bodega, setBodega] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        getInventarioBodega();
    }, [id]);

   
    const getInventarioBodega = async () => {
        setLoading(true);

        try {
            const response = await api(`api/bodega/${id}/inventario/`);  
            const data = await response.json();
            setBodega(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    
    if (loading) {
        return (
            <Loading/>
        );
    }

    if (!bodega) {
        return (
            <div className="container mt-4">
                <p>No se encontró la bodega.</p>
            </div>
        );
    }


    return (
        <div className="container pt-2">
            <button
                className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={16} />
                Volver
            </button>

            <div className="card shadow-sm border-0 mb-3 bg-blue-light">
                <div key={id} className="d-flex p-2 gap-4">
                    <p className="mb-0">
                        <strong>Bodega:</strong> {bodega.bodega}
                    </p>
                    <p className="mb-0">
                        <strong>Total Productos:</strong> {bodega.totalProductos}
                    </p>
                    <p className="mb-0">
                        <strong>Total Items:</strong> {bodega.totalItems}
                    </p>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="mb-3 blue-title">Productos en esta bodega</h5>

                    <div className="card table-responsive table-scroll" style={{maxHeight:"30rem",overflow:"auto"}}>
                        <table className="table table-hover align-middle">
                            <thead className="bg-blue">
                                <tr>
                                    <th>Producto</th>
                                    <th>Descripcion</th>
                                    <th className="text-center">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bodega?.productos?.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-muted">
                                            No hay productos en esta bodega
                                        </td>
                                    </tr>
                                ):(
                                    bodega.productos?.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.nombre}</td>
                                        <td>{!p.descripcion?"Sin descripcion":p.descripcion}</td>
                                        <td className="text-center">{p.cantidad}</td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default BodegaDetail;