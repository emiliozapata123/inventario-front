import { useState } from "react";
import { NotifyError } from "../notify/Notify";
import api from "../../services/Api";
import { NotifySuccess } from "../notify/Notify";
import useMensaje from "../notify/useMensaje";

const CambiarContrañena = ({setMostrarModal}) => {
    const {mensaje,cargarMensaje} = useMensaje();
    const [enviando, setEnviando] = useState(false);
    const [formulario, setFormulario] = useState({
        actual:"",
        nueva:"",
        confirmar:""
    });


    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);
        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const handleChange = (name,value) => {
        setFormulario(prev => ({
            ...prev,
            [name]:value
        }));
    }

    const validarContrasena = (contrasena) => {
        let numero = false;
        let mayuscula = false;
        let minuscula = false;

        for (let letra = 0;letra<contrasena.length;letra++) {
            const char = contrasena[letra];
            if (char === char.toUpperCase()) {
                mayuscula = true;
            }
            if (char === char.toLowerCase()) {
                minuscula = true;
            }
            if (char.match(/[0-9]/)) {
                numero = true;
            }
        }

        if (!numero || !mayuscula || !minuscula) {
            return false;
        }
        return true;
    }
    
    const cambiarContrasena = async (data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api("accounts/user/update/","POST",data);
            setMostrarModal(false);
            NotifySuccess("Contraseña actualizada.");
        } catch (error) {
            console.error(error);
        } finally {
            setEnviando(false);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formulario.actual.trim()) {
            danger("actual","debe ingresar la contraseña actual");
            return;
        }

        if (!formulario.nueva.trim()) {
            danger("nueva","ingresa nueva contraseña");
            return;
        }

        if (!formulario.confirmar.trim()){
            danger("confirmar","ingresa nuevamente la contraseña");
            return;
        }

        if (formulario.nueva.length < 8) {
            danger("nueva","la contraseña debe tener al menos 8 caracteres");
            return;
        }

        const esValido = validarContrasena(formulario.nueva.trim());
        if (!esValido) {
            NotifyError("Error,La contraseña debe tener al menos una mayuscula,una minuscula y un numero.");
            return;
        }

        if (formulario.nueva.trim() !== formulario.confirmar.trim()){
            NotifyError("La contraseña no coinciden");
            return;
        }

        const data = {
            actual:formulario.actual,
            password:formulario.confirmar
        };

        cambiarContrasena(data);

    }

    return(
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-bold">Cambiar Contraseña</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMostrarModal(false)}>
                    </button>
                </div>

                <div className="modal-body">
                    <p className="text-muted mb-3">
                    Ingresa define una nueva contraseña segura.
                    </p>
                    <div className="mb-3">
                    <label className="fw-semibold">Contraseña Actual</label>
                    <input
                        type="password"
                        className={`form-control ${mensaje.actual ? "is-invalid" : ""}`}
                        value={formulario.actual}
                        placeholder="ingresa la contraseña actual...."
                        onChange={(e) => handleChange("actual", e.target.value)}
                    />
                    <div className="invalid-feedback d-block">
                        {mensaje.actual}
                    </div>
                    </div>
                    <div className="mb-3">
                    <label className="fw-semibold">Nueva Contraseña</label>
                    <input
                        type="password"
                        className={`form-control ${mensaje.nueva ? "is-invalid" : ""}`}
                        value={formulario.nueva}
                        placeholder="ingresa la nueva contraseña....."
                        onChange={(e) => handleChange("nueva", e.target.value)}
                    />
                    <div className="invalid-feedback d-block">
                        {mensaje.nueva}
                    </div>
                    </div>

                    <div className="mb-3">
                    <label className="fw-semibold">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        className={`form-control ${mensaje.confirmar ? "is-invalid" : ""}`}
                        value={formulario.confirmar}
                        placeholder="ingresa nuevamente la contaseña....."
                        onChange={(e) => handleChange("confirmar", e.target.value)}
                    />
                    <div className="invalid-feedback d-block">
                        {mensaje.confirmar}
                    </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        className="btn btn-outline-secondary w-100"
                        type="button"
                        onClick={() => setMostrarModal(false)}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="btn btn-primary d-flex justify-content-center align-items-center w-100"
                        disabled={enviando}
                    >
                        {enviando ? (
                            <>
                                <span 
                                    className="spinner-border spinner-border-sm me-2" 
                                    role="status" 
                                    aria-hidden="true"
                                ></span>
                                Enviando...
                            </>
                        ) : (
                            <>
                            Actualizar Contraseña
                            </>
                        )}
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </form>
    )
}
export default CambiarContrañena;

