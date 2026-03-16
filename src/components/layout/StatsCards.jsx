import { Box, ExclamationTriangle, Cart } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import api from "../../services/Api";

const StatsCards = () => {
    const [productos, setProductos] = useState([]);
    const [resumen, setResumen] = useState({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    useEffect(()=> {
        cargarDatos();
        cargarResumenInventario();
    }, []);

    const cargarDatos = async () => {
        try {
            const resAlert = await api("api/inventario/alert-stock/");
            setProductos(await resAlert.json());

        } catch (error) {
            console.error(error);
        }
    }

    const cargarResumenInventario = async () => {
        try {
            const resResumen = await api("api/inventario/resumen/");
            setResumen(await resResumen.json());

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="row g-4">

            <div className="col-md-3">
                <div className="card custom-card">
                    <div className="card-body">
                        <div className="icon-box bg-blue">
                        <Box size={22} />
                        </div>
                        <p className="text-muted mt-3 mb-1">Total Productos</p>
                        <h3 className="fw-bold">{resumen?.totalProductos}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card custom-card">
                    <div className="card-body">
                        <div className="icon-box bg-yellow">
                        <ExclamationTriangle size={22} />
                        </div>
                        <p className="text-muted mt-3 mb-1">Stock Bajo</p>
                        <h3 className="fw-bold">{productos?.length}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card custom-card">
                    <div className="card-body">
                        <div className="icon-box bg-purple">
                        <Cart size={22} />
                        </div>
                        <p className="text-muted mt-3 mb-1">Items Totales</p>
                        <h3 className="fw-bold">{resumen?.totalItems}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
