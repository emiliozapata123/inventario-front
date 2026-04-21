const FilterBodega = ({ bodegas, formulario, setFormulario, }) => {
    return(
        <div className="dropdown">
            <button className="btn btn-outline-primary rounded-1 w-100 dropdown-toggle" data-bs-toggle="dropdown">
                {!formulario?.bodega ? "Filtrar por Bodega" : bodegas.find(b => b.id === formulario.bodega)?.nombre}
            </button>
            <ul className="dropdown-menu w-100" style={{zIndex:4000}}>
                <li>
                    <button 
                        className="dropdown-item" 
                        onClick={() => 
                            setFormulario(prev => ({
                                ...prev,
                                bodega:""
                            }))
                        }
                    >
                        Todos
                    </button>
                </li>
                {bodegas.map(b => (
                    <li key={b.id}>
                        <button 
                            type="button"
                            className="dropdown-item" 
                            onClick={() => 
                                setFormulario(prev => ({
                                    ...prev,
                                    bodega:b.id
                                }))
                            }
                        >
                            {b.nombre}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default FilterBodega;