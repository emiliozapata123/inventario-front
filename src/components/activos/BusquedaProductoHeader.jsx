const BusquedaProductoHeader = ({ busqueda, setBusqueda }) => {
    return(
        <div className="mb-2 position-relative">
            <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                <i className="bi bi-search"></i>
            </span>
            <input
                type="text"
                className="form-control ps-5 rounded-1"
                placeholder="Buscar Productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </div>
    )
}
export default BusquedaProductoHeader;