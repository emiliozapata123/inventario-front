import { Plus } from "react-bootstrap-icons";

const InventarioList = ({ item, setMostrarModal }) => {
    return (
        <tr>
            <td>{item?.producto.nombre}</td>
            <td>{item?.bodega.nombre}</td>
            <td className="text-center"> 
                <span className={`badge ${
                    item?.stock < item?.stockMinimo
                    ? "bg-danger"
                    : "bg-success"}`}
                >
                    {item?.stock}
                </span>
            </td>
            <td className="text-center fw-bold">
                {!item?.stockMinimo?"sin stock minimo definido":item?.stockMinimo}
            </td>
            <td>
                <div>
                    <button className="btn btn-success " onClick={()=> setMostrarModal(item)}>
                        <Plus size={24}/>
                        Stock
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default InventarioList;
