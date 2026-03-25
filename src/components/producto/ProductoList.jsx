import { Pencil, Trash } from "react-bootstrap-icons";

const ProductoList = ({producto, setMostrarModal}) => {
    return (
        <tr>
            <td>{producto.nombre}</td>
            <td>{!producto.descripcion ? <span className="badge bg-light text-dark border">—</span>:producto.descripcion}</td>
            <td>
                <div className="d-flex gap-1">
                    <button className="btn btn-warning rounded-1 d-flex align-items-center" onClick={()=> setMostrarModal("update")}>
                        <Pencil className="me-2"/>
                        Editar
                    </button>
                    <button className="btn btn-danger rounded-1 d-flex align-items-center" onClick={()=> setMostrarModal("delete")}>
                        <Trash  className="me-2"/>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default ProductoList;