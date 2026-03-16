import useFetch from "../notify/useFetch";

const FiltroMovimientos = ({setPorBodega,setPorFecha,setTipoMovimiento,porBodega,porFecha,tipoMovimiento}) => {
    const { data:bodegas } = useFetch("api/bodega/list/");
    
    return (
        <div className="d-flex gap-1 flex-column flex-md-row mb-2">
            <div className="col-md-4">
                <input
                    type="date"
                    className="form-control ps-5"
                    value={porFecha}
                    placeholder="Filtrar por fecha"
                    onChange={(e) => setPorFecha(e.target.value)}
                />
            </div>
            <div className="col-md-4">
                <div className="dropdown">
                    <button className="btn btn-outline-primary w-100 dropdown-toggle" data-bs-toggle="dropdown">
                        {!tipoMovimiento?"Filtrar por tipo movimiento":tipoMovimiento}
                    </button>

                    <ul className="dropdown-menu w-100" style={{zIndex:2000}}>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> setTipoMovimiento("")}
                            >
                                Todos
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> setTipoMovimiento("Entrada")}
                            >
                                Entrada
                            </button>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item" 
                                onClick={()=> setTipoMovimiento("Salida")}
                            >
                                Salida
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="col-md-4">
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
export default FiltroMovimientos;