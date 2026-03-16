import { useState } from "react";
import useMensaje from "../notify/useMensaje";

const BodegaForm = ({ addBodega }) => {
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
        <div className="row">
            <div className="col">
                <input
                    type="text"
                    className={`form-control ${mensaje.nombre?"is-invalid":""}`}
                    value={nombre}
                    placeholder="Ingrese nombre de la bodega"
                    onChange={(e)=> setNombre(e.target.value)}
                />
                <div className="invalid-feedback d-block">{mensaje.nombre}</div>
            </div>  
            <div className="col-auto">
                <button
                    className="btn btn-primary d-flex align-items-center gap-2 px-3"
                    onClick={handleOnClick}
                >
                <i className="bi bi-plus-lg"></i>
                    Nueva Bodega
                </button>
            </div>  
        </div>
    )

}
export default BodegaForm;

