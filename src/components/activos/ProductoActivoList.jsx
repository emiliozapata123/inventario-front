import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../layout/Loading";
import api from "../../services/Api";
import ProcuctoActivoRow from "./ProductoActivoRow";
import { ArrowLeft } from "react-bootstrap-icons";
import { NotifyError, NotifySuccess } from "../notify/Notify";


const ProductoActivoList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editandoId, setEditandoId] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        cargarProductos();
    }, []);

    //productos de tipo activos
    const cargarProductos = async () => {
        setLoading(true);

        try {
            const response = await api("api/activo/producto/list/");
            setProductos(await response.json());

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updateProductoActivo = async (id,data) => {
        if (enviando) return;

        setEnviando(true);
        try {
            await api(`api/activo/producto/${id}/update/`, "PATCH", data);
            NotifySuccess("Producto actualizado correctamente.");
            setEditandoId(null);
            cargarProductos();

        } catch (error) {
            console.error(error);
            NotifyError("Error al actualizar.");
        } finally {
            setEnviando(false);
        }
    }


    return (

        <>
            <div className="d-flex align-items-center mb-4 pt-4 flex-wrap gap-3 ms-3 me-3">
                <button className="d-flex gap-2 align-items-center btn btn-outline-secondary mb-3" onClick={()=> navigate(-1)}>
                    <ArrowLeft/>
                    Volver
                </button>
                <div>
                    <h4 className="fw-bold mb-1 blue-title">Listado de productos activos</h4>
                    <p className="text-muted mb-0">
                        Administra los productos de la plataforma
                    </p>
                </div>
            </div>
            
            <section className="card border-0 shadow-sm p-2 ms-3 me-3">
                <div className="card table-responsive shadow-sm" style={{maxHeight:"33rem",overflow:"auto"}}>
                    <table className={`table ${!editandoId ? "table-hover":""}`}>
                        <thead className="bg-blue">
                            <tr>
                                <th>Tipo de Producto</th>
                                <th>Descripcion</th>
                                <th className="text-center">Marca</th>
                                <th className="text-center">Modelo</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <Loading/>
                                    </td>
                                </tr>
                            ):(
                            productos?.map((p) => (
                                <ProcuctoActivoRow 
                                    producto={p}
                                    editandoId={editandoId}
                                    setEditandoId={setEditandoId}
                                    onUpdate={updateProductoActivo}
                                    enviando={enviando}
                                />
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
export default ProductoActivoList;