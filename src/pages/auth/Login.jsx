import "../auth/Login.css";
import api from "../../services/Api";
import { NotifyError } from "../../components/notify/Notify";
import { NotifySuccess } from "../../components/notify/Notify";
import { useState } from "react";
import useMensaje from "../../components/notify/useMensaje";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const {cargarMensaje, mensaje} = useMensaje("");
    const navigate = useNavigate();

    const mostrarMensaje = (campo,mensaje) => {
        cargarMensaje(campo,mensaje);
        setTimeout(() => {
            cargarMensaje(campo,"");
        }, 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valido = true;

        if (!correo) {
            mostrarMensaje("correo","debe ingresar el correo");
            valido = false;
        }
        
        if (!password) {
            mostrarMensaje("password","debe ingresar la contraseña");
            valido = false;
        }

        if (!valido) return;
        
        const data = {
            username:correo,
            password:password
        };


        try {
            const response = await api("accounts/login/","POST",data);
            const result = await response.json();
            sessionStorage.setItem("user",JSON.stringify(result.user));
            sessionStorage.setItem("access", result.access);
            sessionStorage.setItem("refresh", result.refresh);

            if (result){
                navigate("/home");
                NotifySuccess("Se inicio sesion.");
                console.log(result.user)
            }

        } catch (error) {
            console.error(error);
            NotifyError("Datos incorrectos.");
        }
    }

    return (
        <div className="login-container">
            <form className="form-login" onSubmit={handleSubmit}>
                <h1>Sistema de Inventario</h1>
                <label className="form-label">Correo Electronico</label>
                <input 
                    type="text"
                    className={`form-control ${mensaje.correo?"is-invalid":""}`}
                    placeholder="Correo" 
                    value={correo} 
                    onChange={(e)=> setCorreo(e.target.value)}
                />
                <div className="invalid-feedback d-block">{mensaje.correo}</div>

                <label className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className={`form-control ${mensaje.password?"is-invalid":""}`}
                    placeholder="Contraseña" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <div className="invalid-feedback d-block">{mensaje.password}</div>

                <button className="btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
        
    )
}
export default Login;