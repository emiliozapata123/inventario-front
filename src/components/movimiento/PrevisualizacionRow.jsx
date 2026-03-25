const PrevisualizacionRow = ({ item, action }) => {
    return (
        <tr>
            <td>{item.producto.nombre}</td>
            <td className="text-center">{item.cantidad}</td>
            {action === "entrada" && (
                <td className="text-center">{item.stockMinimo}</td>
            )}
        </tr>
    )
}
export default PrevisualizacionRow;