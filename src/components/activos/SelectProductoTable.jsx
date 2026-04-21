import { useState } from "react";
import SelectProductoRow from "./SelectProductoRow";
import Loading from "../layout/Loading";
import Busqueda from "../layout/Busqueda";
import FilterBodega from "./FilterBodega";

const SelectProductoTable = ({ setFormulario, formulario, productos, setMostrarModal, loading, bodegas }) => {
    const [seleccionado, setSeleccionado] = useState({});
    const [busqueda, setBusqueda] = useState("");

    const busquedaProductos = productos?.filter((p) => {
        const busquedaLower = busqueda?.toLowerCase() || "";

        const cumpleBusqueda =
            !busquedaLower ||
            p?.producto?.toLowerCase().includes(busquedaLower) ||
            p?.descripcion?.toLowerCase().includes(busquedaLower) ||
            p?.marca?.toLowerCase().includes(busquedaLower) ||
            p?.modelo?.toLowerCase().includes(busquedaLower);

        const cumpleBodega =
            !formulario?.bodega ||
            p?.bodega.includes(bodegas?.find(b => b.id === formulario.bodega)?.nombre);

        return cumpleBusqueda && cumpleBodega;

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
                        <div className="row g-2 mb-2">
                            <div className="col-md-6">
                                <Busqueda busqueda={busqueda} setBusqueda={setBusqueda}/>
                            </div>
                            <div className="col-md-6">
                                <FilterBodega 
                                    bodegas={bodegas} 
                                    formulario={formulario} 
                                    setFormulario={setFormulario}
                                />
                            </div>
                        </div>
                        <div className="card table-responsive" style={{maxHeight:"28rem",overflowY:"auto"}}>
                            <table className="table table-hover mb-0">
                                <thead className="bg-blue">
                                    <tr>
                                        <th className="text-nowrap">Producto</th>
                                        <th>Descripcion</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-center">Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={"6"}>
                                                <Loading/>
                                            </td>
                                        </tr>
                                    ) : busquedaProductos.length === 0 ? (
                                        <tr>
                                            <td colSpan={"6"} className="text-center">
                                                <span>No se encontraron productos</span>
                                            </td>
                                        </tr>
                                    ) : busquedaProductos?.map((p) => (
                                        <SelectProductoRow 
                                            key={p.id} 
                                            producto={p} 
                                            seleccionado={seleccionado}
                                            setSeleccionado={(invId,productoId,bodegaId) => setSeleccionado({invId,productoId,bodegaId})}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end gap-2 flex-wrap mt-2">
                            <button 
                                className="btn-light-hover"
                                onClick={()=> {setMostrarModal(false); setFormulario(prev => ({...prev,bodega:""}))}}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn btn-primary d-flex justify-content-center align-items-center rounded-1"
                                onClick={() => 
                                    {setFormulario((prev) => ({
                                        ...prev,
                                        invId:seleccionado.invId,
                                        producto:seleccionado.productoId,
                                        bodega:seleccionado.bodegaId
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