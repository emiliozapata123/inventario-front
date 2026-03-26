import { useState } from "react";
import SelectProductoRow from "./SelectProductoRow";
import BusquedaProductoHeader from "./BusquedaProductoHeader";
import Loading from "../layout/Loading";

const SelectProductoTable = ({ setFormulario, productos, setMostrarModal, loading }) => {
    const [seleccionado, setSeleccionado] = useState("");
    const [busqueda, setBusqueda] = useState("");

    const busquedaProductos = productos.filter((p) => {
        const busquedaLower = busqueda?.toLowerCase();
        if (!busquedaLower) return true;

        const porTipo = p.tipoProducto.toLowerCase().includes(busquedaLower);
        const porDescripcion = p?.descripcion?.toLowerCase().includes(busquedaLower);
        const porMarca = p?.marca?.toLowerCase().includes(busquedaLower);
        const porModelo = p?.modelo?.toLowerCase().includes(busquedaLower);

        return porTipo || porDescripcion || porMarca || porModelo;
    });


    return(
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content border-0 shadow rounded-2">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold blue-title">Listado de Productos</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={()=> setMostrarModal(false)}>
                        </button>
                    </div>

                    <div className="modal-body">
                        <BusquedaProductoHeader busqueda={busqueda} setBusqueda={setBusqueda}/>

                        <div className="card table-responsive" style={{maxHeight:"28rem",overflow:"auto"}}>
                            <table className="table table-hover mb-0">
                                <thead className="bg-blue">
                                    <tr>
                                        <th></th>
                                        <th className="text-nowrap">Tipo Producto</th>
                                        <th>Descripcion</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={"5"}>
                                                <Loading/>
                                            </td>
                                        </tr>
                                    ) : busquedaProductos.length === 0 ? (
                                        <tr>
                                            <td colSpan={"5"} className="text-center">
                                                <span>No se encontraron productos</span>
                                            </td>
                                        </tr>
                                    ) : busquedaProductos?.map((p) => (
                                        <SelectProductoRow 
                                            key={p.id} 
                                            producto={p} 
                                            seleccionado={seleccionado}
                                            setSeleccionado={setSeleccionado}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end gap-2 flex-wrap mt-2">
                            <button 
                                className="btn-light-hover"
                                onClick={()=> setMostrarModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn btn-primary d-flex justify-content-center align-items-center rounded-1"
                                onClick={() => 
                                    {setFormulario((prev) => ({
                                        ...prev,
                                        activo:seleccionado
                                    }));
                                    setMostrarModal(false)}}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SelectProductoTable;