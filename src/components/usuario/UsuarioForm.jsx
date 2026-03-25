import { useState } from "react";
import useMensaje from "../notify/useMensaje";

const UsuarioForm = ({usuario, addUsuario, setMostrarModal, enviando}) => {
    const {cargarMensaje,mensaje} = useMensaje();
    const [formulario, setFormulario] = useState({
        nombre:usuario?.nombre || "",
        correo:usuario?.correo || ""
    });

    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);
        setTimeout(()=> {
            cargarMensaje(name,"");
        },3000);

    };

    const handleChange = (name,value) => {
        setFormulario(prev => ({
            ...prev,
            [name]:value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let campoValido = true;

        if (!formulario.nombre.trim()){
            danger("nombre","ingrese nombre del usuario");
            campoValido = false;
        }
        if (!formulario.correo.trim()){
            danger("correo","ingrese descripcion del usuario");
            campoValido = false;
        }
        if (!campoValido) return;
        
        addUsuario(formulario);
    };

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-2">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Crear Nuevo Usuario</h5>
                        <button type="button" className="btn-close" onClick={()=> setMostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa los datos para agregar un nuevo usuario a la plataforma
                        </p>

                        <div className="mb-3">
                            <label className="fw-semibold">Nombre Completo</label>
                            <input
                                type="text"
                                className={`form-control rounded-1 ${mensaje.nombre?"is-invalid":""}`}
                                value={formulario.nombre}
                                placeholder="Ingrese nombre completo"
                                onChange={(e)=> handleChange("nombre",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.nombre}</div>
                        </div>
                        
                        <div className="mb-3">
                            <label className="fw-semibold">Correo Electronico</label>
                            <input
                            type="text"
                            className={`form-control rounded-1 ${mensaje.correo?"is-invalid":""}`}
                            value={formulario.correo}
                            placeholder="Ingrese correo electronico"
                            onChange={(e)=> handleChange("correo",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.correo}</div>
                        </div>
                        
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn-light-hover w-25"type="button" onClick={()=> setMostrarModal(false)}>Cancelar</button>
                            <button 
                                className="btn btn-primary d-flex justify-content-center align-items-center w-auto rounded-1"
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
                                    Crear Usuario
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
export default UsuarioForm;

