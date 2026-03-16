import useFetch from "../notify/useFetch";

const FiltroInventario = ({setPorProducto, setPorBodega,porProducto,porBodega}) => {
    const { data:bodegas} = useFetch("api/bodega/list/");

    return (
        <div className="d-flex gap-1 flex-column flex-md-row mb-2">
            <div className="col-md-6 position-relative">
                <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                    <i className="bi bi-search"></i>
                </span>
                <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Buscar Producto..."
                    value={porProducto}
                    onChange={(e) => setPorProducto(e.target.value)}
                />
            </div>
            <div className="col-md-6">
                <div className="dropdown">
                    <button className="btn btn-outline-primary w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!porBodega?"Filtrar Por Bodega":porBodega}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> setPorBodega("")}
                            >
                                Todos
                            </button>
                        </li>
                        {bodegas.map((b)=> (
                            <li key={b.id}>
                                <button 
                                    className="dropdown-item" 
                                    onClick={()=> setPorBodega(b.nombre)}
                                >
                                    {b.nombre}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
} 
export default FiltroInventario;