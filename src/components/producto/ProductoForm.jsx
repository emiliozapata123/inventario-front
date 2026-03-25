import { useState } from "react";
import useMensaje from "../notify/useMensaje";

const ProductoForm = ({ producto, addProducto, updateProducto, setMostrarModal, action, enviando }) => {
    const {cargarMensaje,mensaje} = useMensaje();
    const [formulario, setFormulario] = useState({
        nombre:producto?.nombre || "",
        descripcion:producto?.descripcion || "",
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

        if (!formulario.nombre.trim()){
            danger("nombre","ingrese nombre del producto");
            return;
        }

        const data = {
            ...formulario,
            nombre:formulario.nombre.trim(),
            descripcion:formulario.descripcion.trim()
        }

        if (action === "form"){
            
            addProducto(data);
        } else {

            updateProducto(producto.id,data);
        }
    };

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-2">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">{action === "form" ? "Crear Nuevo Producto":"Editar Producto"}</h5>
                        <button 
                            type="button" 
                            disabled={enviando} 
                            className="btn-close" 
                            onClick={()=> setMostrarModal(false)}>
                        </button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa los datos para agregar un nuevo producto a la plataforma
                        </p>
                        <div className="mb-3">
                            <label className="fw-semibold">Nombre del Producto</label>
                            <input
                                type="text"
                                className={`form-control rounded-1 ${mensaje.nombre?"is-invalid":""}`}
                                value={formulario.nombre}
                                placeholder="Ingrese nombre de producto"
                                onChange={(e)=> handleChange("nombre",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.nombre}</div>
                        </div>
                        <div className="mb-3">
                            <label className="fw-semibold">Descripcion de Producto</label>
                            <textarea
                                className={`form-control rounded-1 ${mensaje.descripcion?"is-invalid":""}`}
                                rows="2"
                                value={formulario.descripcion}
                                placeholder="Descripción detallada del producto..."
                                onChange={(e)=> handleChange("descripcion",e.target.value)}
                            ></textarea>
                            <div className="invalid-feedback d-block">{mensaje.descripcion}</div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 flex-wrap">
                            <button 
                                className="btn-light-hover w-25"
                                disabled={enviando}
                                type="button" onClick={()=> setMostrarModal(false)}
                            >
                                Cancelar
                            </button>
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
                                    {action === "form" ? "Crear Producto":"Editar Producto"}
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
export default ProductoForm;

