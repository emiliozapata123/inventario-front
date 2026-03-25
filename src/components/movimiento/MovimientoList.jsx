const MovimientoList = ({movimiento}) => {
    return (
        <tr>
            <td className="text-center">
                <span
                    className={`badge ${
                    movimiento?.movimiento.tipo === "Entrada"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                >
                    {movimiento?.movimiento.tipo}
                </span>
            </td>
            <td className="text-center">{movimiento?.movimiento.fechaMovimiento}</td>
            <td className="text-center">{!movimiento?.movimiento.fechaEntrega ?<span className="badge bg-light text-dark border">—</span>: movimiento.movimiento.fechaEntrega}</td>
            
            <td>{movimiento?.movimiento.bodega.nombre}</td>
            <td>{movimiento?.producto.nombre}</td>
            <td className="text-center"> 
                <span className={`badge ${
                    movimiento?.movimiento.tipo==="Salida"
                    ? "bg-danger"
                    : "bg-success"}`}
                >
                    {movimiento?.movimiento.tipo === "Salida" ? `-${movimiento.cantidad}`:`+${movimiento.cantidad}`}
                </span>
            </td>
        </tr>
    )
}
export default MovimientoList;