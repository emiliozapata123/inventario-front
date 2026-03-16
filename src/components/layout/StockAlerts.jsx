import { useEffect, useState } from "react";
import api from "../../services/Api";
import Loading from "./Loading";

const StockAlerts = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=> {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);

        try {
            const response = await api("api/inventario/alert-stock/");
            setProductos(await response.json());

        } catch (error) { 
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
     
    return (
        <div className="card section-card">
            <div className="card-header section-header">
            ⚠ Alertas de Stock
            </div>
            <div className="card-body">
                {loading ? (
                    <Loading/>
                ):(
                    productos.length === 0 ? (
                        <p>Sin alertas de stock</p>
                    ):(
                    productos.map((p)=> (
                        <div className="alert-item mb-3">
                            <div>
                                <strong>{p?.producto}</strong>
                                <div className="text-muted small">Bodega: {p?.bodega}</div>
                            </div>
                            <div className="text-end">
                                <div className="text-muted small">Stock actual</div>
                                <strong className="text-danger">{p?.stock} uds</strong>
                            </div>
                        </div>
                    )))
                )}
            </div>
        </div>
    );
};

export default StockAlerts;
