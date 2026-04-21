import { Plus } from "react-bootstrap-icons";

const InventarioList = ({ item, setMostrarModal }) => {
    return (
        <tr>
            <td className="text-break">{item?.producto.nombre}</td>
            <td className="text-break">
                {!item?.producto.descripcion ? <span className="badge text-dark">—</span>:item.producto.descripcion}
            </td>
            <td className="text-break">{item?.bodega.nombre}</td>
            <td className="text-center"> 
                {item?.stock}
            </td>
            <td className="text-center fw-bold">
                {!item?.stockMinimo?<span className="badge text-dark">—</span>:item?.stockMinimo}
            </td>
            <td>
                <div>
                    <button className="btn btn-success rounded-1 d-flex btn-sm align-items-center" onClick={()=> setMostrarModal(item)}>
                        <Plus size={24}/>
                        Stock
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default InventarioList;
