import PrevisualizacionRow from "./PrevisualizacionRow";

const PrevisualizacionMovimiento = ({ setPrevisualizacion, enviando, movimiento, handleConfirmar, action }) => {

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-2">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold blue-title">Previsualizacion de Movimiento</h5>
                        <button 
                            type="button" 
                            disabled={enviando} 
                            className="btn-close" 
                            onClick={()=> setPrevisualizacion(false)}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="bg-blue-light p-3 rounded mb-3">
                            <p className="mb-2">
                                <span className="fw-semibold">Bodega:</span><br/>
                                {movimiento.bodega.nombre}
                            </p>

                            <p className="mb-0">
                                <span className="fw-semibold me-1">{action === "entrada" ? "Fecha Entrega:" : "Fecha Movimiento:"}</span>
                                {movimiento?.fechaEntrega || movimiento?.fechaMovimiento}
                            </p>
                        </div>
                        <div className="card shadow-sm table-responsive" style={{maxHeight:"20rem",width:"auto"}}>
                            <table className="table bg-blue mb-0">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Cantidad</th>
                                        {action === "entrada" && (
                                            <th className="text-center"style={{minWidth:"8rem"}}>Stock minimo</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {movimiento.productos.map((m)=> (
                                        <PrevisualizacionRow key={m.id} item={m} action={action}/>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-2">
                            <button 
                                disabled={enviando}
                                className="btn btn-light-hover"
                                onClick={()=> setPrevisualizacion(false)}
                            >
                                Cancelar
                            </button>
        
                            <button 
                                className="btn btn-success d-flex align-items-center rounded-1"
                                disabled={enviando}
                                onClick={handleConfirmar}
                            >
                                {enviando ? (
                                    <>
                                        <span 
                                            className="spinner-border spinner-border-sm me-2" 
                                            role="status" 
                                            aria-hidden="true"
                                        ></span>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                    Registrar Movimiento
                                    </>
                                    
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrevisualizacionMovimiento;