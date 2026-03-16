import { useState } from "react";
import useMensaje from "../notify/useMensaje";

const ActualizarStockForm = ({item, setMostrarModal, actualizarStock}) => {
    const {mensaje, cargarMensaje} = useMensaje();
    const [formulario, setFormulario] = useState({
        productos:[{id:item.producto.id,cantidad:""}],
        bodega:item.bodega.id,
        fecha:""
    });

    console.log(formulario)

    const danger = (name,mensaje) => {
        cargarMensaje(name,mensaje);

        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "cantidad") {
            setFormulario(prev => ({
                ...prev,
                productos:[{...prev.productos[0],cantidad:Number(value)}]
            }));

        } else {
            setFormulario(prev => ({
                ...prev,
                [name]:value
            }));
        }
    }

    const handleOnClick = () => {
        if (!formulario.fecha) {
            danger("fecha","debe ingresar fecha de ingreso");
            return;
        }

        if (!formulario.productos[0].cantidad) {
            danger("stock","ingrese stock a actualizar");
            return;
        }

        if (formulario.productos[0].cantidad <= 0) {
            danger("stock","cantidad no valida");
            return;
        }

        
        actualizarStock(formulario);
        setMostrarModal(false);
    }

    return (
       <div className="modal show fade d-block">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-3">

                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold text-primary">
                            Actualizar Stock
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setMostrarModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <h4 className="fw-bold text-dark">
                                {item.bodega.nombre}
                            </h4>
                        </div>

                        <div className="bg-blue-light p-3 rounded mb-3">

                            <p className="mb-2">
                                <span className="fw-semibold">Producto:</span><br/>
                                {item.producto.nombre}
                            </p>

                            <p className="mb-0">
                                <span className="fw-semibold me-1">Stock actual:</span>
                                <span className={`badge ${item.stock < item.stockMinimo 
                                    ? "bg-danger" 
                                    : "bg-success"
                                }`}>
                                    {item.stock}
                                </span>
                            </p>

                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Ingrese la fecha de ingreso:
                            </label>

                            <input
                                type="date"
                                name="fecha"
                                className={`form-control form-control-lg ${mensaje.fecha ? "is-invalid" : ""}`}
                                onChange={handleChange}
                            />

                            <div className="invalid-feedback">
                                {mensaje.fecha}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Cantidad a ingresar:
                            </label>

                            <input
                                type="number"
                                name="cantidad"
                                className={`form-control form-control-lg ${mensaje.stock ? "is-invalid" : ""}`}
                                placeholder="Ingrese cantidad..."
                                onChange={handleChange}
                            />

                            <div className="invalid-feedback">
                                {mensaje.stock}
                            </div>
                        </div>

                    </div>

                    <div className="modal-footer border-0">
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => setMostrarModal(false)}
                        >
                            Cancelar
                        </button>

                        <button 
                            className="btn btn-success px-4"
                            onClick={handleOnClick}
                        >
                            Actualizar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ActualizarStockForm;