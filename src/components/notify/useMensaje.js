import { useState } from "react";

const useMensaje = () => {
    const [mensaje,setMensaje] = useState({});

    const cargarMensaje = (campo,value) => {
        setMensaje(prev => ({
            ...prev,
            [campo]:value
        }));

    };
    return {
        cargarMensaje,
        mensaje
    }

}
export default useMensaje;