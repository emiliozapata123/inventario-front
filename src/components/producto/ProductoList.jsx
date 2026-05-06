import { Pencil, Trash } from "react-bootstrap-icons";

const ProductoList = ({ producto, tipo, setMostrarModal }) => {
    return (
        <tr>
            <td className="text-break">{producto.nombre}</td>
            <td className="text-break">{!producto.descripcion ? <span className="badge text-dark">—</span>:producto.descripcion}</td>
            {tipo === "Activo" && (
                <td className="text-break">
                    {!producto.marca ? <span className="badge text-dark">—</span>: producto.marca}
                </td>
            )}
            {tipo === "Activo" && (
                <td className="text-break">
                    {!producto.modelo ? <span className="badge text-dark">—</span>: producto.modelo}
                </td>
            )}
            <td>
                <div className="d-flex gap-1 justify-content-center">
                    <button className="btn btn-warning rounded-1 d-flex align-items-center" onClick={()=> setMostrarModal("update",producto)}>
                        <Pencil className="me-2"/>
                        Editar
                    </button>
                    <button className="btn btn-danger rounded-1 d-flex align-items-center" onClick={()=> setMostrarModal("delete", producto)}>
                        <Trash  className="me-2"/>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default ProductoList;