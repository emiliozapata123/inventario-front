import { useState } from "react";
import useMensaje from "../notify/useMensaje";
import { Plus } from "react-bootstrap-icons";

const BodegaForm = ({ addBodega, enviando }) => {
    const {cargarMensaje,mensaje} = useMensaje();
    const [nombre, setNombre] = useState("");

    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);
        setTimeout(()=> {
            cargarMensaje(name,"");
        },3000);

    };

    const handleOnClick = (e) => {
        e.preventDefault();

        if (!nombre.trim()){
            danger("nombre","ingrese nombre del bodega");
            return;
        }

        addBodega({nombre});
      
    };

    return (
        <div className="d-flex gap-2 mb--2">
            <div className="flex-grow-1">
                <input
                    type="text"
                    className={`form-control rounded-1 ${mensaje.nombre?"is-invalid":""}`}
                    value={nombre}
                    placeholder="Ingrese nombre de la bodega"
                    onChange={(e)=> setNombre(e.target.value)}
                />
                <div className="invalid-feedback d-block m-auto">{mensaje.nombre}</div>
            </div>
            <div>
                <button 
                    className="btn btn-primary d-flex align-items-center rounded-1"
                    disabled={enviando}
                    onClick={handleOnClick}
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
                        <Plus size={24} className="me-1" />
                        Nueva Bodega
                        </>
                        
                    )}
                </button>
            </div>  
        </div>
    )

}
export default BodegaForm;

