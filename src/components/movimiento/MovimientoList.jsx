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
            <td>{movimiento?.movimiento.fechaRegistro}</td>
            <td>{!movimiento?.movimiento.fechaEntrega ? "No aplica" : movimiento.movimiento.fechaEntrega}</td>
            
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