import { useState } from "react";
import api from "../../services/Api";
import useMensaje from "../notify/useMensaje";
import { NavLink } from "react-router-dom";
import { NotifySuccess } from "../notify/Notify";
import { Plus,ListUl } from "react-bootstrap-icons";

const ProductoActivoForm = () => {
    const [formulario, setFormulario] = useState({});
    const {mensaje, cargarMensaje} = useMensaje();

    const danger = (name, mensaje) => {
        cargarMensaje(name,mensaje);

        setTimeout(() => {
            cargarMensaje(name,"");
        }, 3000);
    }

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormulario(prev => ({
            ...prev,
            [name]:value
        }));
    }

    const addProductoActivo = async (data) => {
        try {
            await api("api/activo/producto/create/", "POST", data);
            NotifySuccess("Procucto Activo creado.");

        } catch (error) {
            console.error(error);
        }
    } 

    const handleOnClick = () => {
        if (!formulario.tipoProducto) {
            danger("tipoProducto","ingrese el tipo de producto");
            return;
        }
        addProductoActivo(formulario);
        setFormulario({});
    }

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-semibold bg-blue">
                Información del producto
            </div>

            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-3">
                        <label>Tipo de producto</label>
                        <input 
                            value={formulario?.tipoProducto || ""}
                            name="tipoProducto"
                            className={`form-control ${mensaje.tipoProducto?"is-invalid":""}`}
                            placeholder="Tipo de producto"
                            onChange={(e)=> handleOnChange(e)}
                        />
                        <div className="invalid-feedback d-block">{mensaje.tipoProducto}</div>
                    </div>
                    <div className="col-md-3">
                        <label>Descripcion</label>
                        <input 
                            value={formulario?.descripcion || ""}
                            name="descripcion"
                            className="form-control" 
                            placeholder="Descripcion del producto"
                            onChange={(e)=> handleOnChange(e)}
                        />
                    </div>

                    <div className="col-md-3">
                        <label>Marca</label>
                        <input 
                            value={formulario?.marca || ""}
                            name="marca"
                            className="form-control" 
                            placeholder="Marca"
                            onChange={(e)=> handleOnChange(e)}
                        />
                    </div>

                    <div className="col-md-3">
                        <label>Modelo</label>
                        <input 
                            className="form-control" 
                            placeholder="Modelo"
                            value={formulario?.modelo || ""}
                            name="modelo"
                            onChange={(e)=> handleOnChange(e)}
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button className="d-flex align-items-center btn btn-primary" onClick={handleOnClick}>
                            <Plus size={24}/>
                            Crear Producto
                        </button>
                        <NavLink 
                            to={"/home/activos/productos/list"}
                            className="btn btn-success d-flex align-items-center gap-2" 
                            onClick={handleOnClick}>
                            <ListUl size={22}/>
                            Ver Listado
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductoActivoForm;