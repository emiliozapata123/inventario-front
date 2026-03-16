import StatsCards from "./StatsCards";
import StockAlerts from "./StockAlerts";
import "../layout/Dashboard.css";
import useFetch from "../notify/useFetch";

const Dashboard = () => {
    const { data:currentUser } = useFetch("accounts/current-user/");

    return (
        <div className="dashboard-container p-4">

            <div className="mb-4">
                <h2 className="fw-bold blue-title">Dashboard</h2>
                <p className="text-muted">
                {`Bienvenido: ${currentUser.nombre} - Vista general del inventario`}
                </p>
            </div>

            <StatsCards />

            <div className="row mt-4 g-4">
                <div className="col-md-6">
                <StockAlerts />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
