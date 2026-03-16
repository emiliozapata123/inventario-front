import { useNavigate } from "react-router-dom";
const PaginaNoDisponible = () => {

    const navigate = useNavigate();

    return (
        <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f8f9fa",
        textAlign: "center"
        }}>

        <h1 style={{fontSize:"3rem", marginBottom:"10px"}}>
            Página no disponible
        </h1>

        <p style={{color:"#6c757d", marginBottom:"20px"}}>
            Debes iniciar sesión para acceder a esta página.
        </p>

        <button
            onClick={() => navigate("/")}
            style={{
            padding:"10px 20px",
            border:"none",
            background:"#0d6efd",
            color:"white",
            borderRadius:"5px",
            cursor:"pointer",
            fontSize:"16px"
            }}
        >
            Volver a iniciar sesión
        </button>

        </div>
    );
}
export default PaginaNoDisponible;