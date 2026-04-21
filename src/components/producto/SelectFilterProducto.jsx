const SelectFilterProducto = ({ value, setValue }) => {
    return(
        <div className="dropdown">
            <button className="btn btn-outline-primary rounded-1 w-100 dropdown-toggle" data-bs-toggle="dropdown">
                {!value ? "Filtrar por tipo" : value}
            </button>

            <ul className="dropdown-menu w-100" style={{zIndex:4000}}>
                <li>
                    <button 
                        type="button"
                        className="dropdown-item" 
                        onClick={()=> setValue("Todos")}
                    >
                        Todos
                    </button>
                </li>
                <li>
                    <button 
                        type="button"
                        className="dropdown-item" 
                        onClick={()=> setValue("Consumible")}
                    >
                        Consumible
                    </button>
                </li>
                <li>
                    <button 
                        type="button"
                        className="dropdown-item" 
                        onClick={()=> setValue("Activo")}
                    >
                        Activo
                    </button>
                </li>
            </ul>
        </div>
    )
}
export default SelectFilterProducto;