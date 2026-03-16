import { useEffect, useState } from "react";
import api from "../../services/Api";

const SelectProducto = ({setFomulario, formulario}) => {
    const [productos, setProductos] = useState([]);
    const [reloadProductos, setReloadProductos] = useState(false);
    const producto = productos?.find((p)=> p.id === formulario?.activo);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=> {
        cargarProductos();
        setReloadProductos(false);
    }, [reloadProductos]);

    //productos de tipo activos
    const cargarProductos = async () => {
        try {
            const response = await api("api/activo/producto/list/");
            setProductos(await response.json());

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-semibold bg-blue">
                Seleccionar producto
            </div>
            <div className="card-body p-2 me-2 ms-2">
                <div className="row g-3">
                    <div className="dropdown">
                        <button 
                            className="btn btn-outline-primary w-100 dropdown-toggle" 
                            data-bs-toggle="dropdown" 
                            onClick={()=> setReloadProductos(true)}
                        >
                            {!formulario?.activo
                            ? "Seleccionar Producto"
                            :`${producto?.tipoProducto} 
                            - ${producto?.descripcion}`}
                        </button>

                        <ul className="dropdown-menu w-100 dropdown-scroll">
                            {productos?.map((p)=> (
                                <li key={p.id}>
                                    <button 
                                        className="dropdown-item" 
                                        onClick={()=> 
                                            setFomulario(prev => ({
                                                ...prev,
                                                activo:p.id
                                            }))
                                        }
                                    >
                                        {p.tipoProducto} - {p.descripcion}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SelectProducto;