const ModalEliminar = ({data,setMostrarModal,handleDelete,message, enviando}) => {
    return (
       <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4 p-3">

                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold">
                            Eliminar {message}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setMostrarModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body text-center">
                        <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"></i>

                        <p className="text-muted">
                            ¿Estás seguro de eliminar
                            <strong className="text-dark"> {data.nombre} </strong>?
                        </p>

                        <p className="text-danger small">
                            Esta acción no se puede deshacer.
                        </p>

                    </div>

                    <div className="d-flex border-0 d-flex gap-3">

                        <button
                            className="btn btn-outline-secondary w-100"
                            onClick={() => setMostrarModal(false)}
                        >
                            Cancelar
                        </button>

                        <button 
                            className="btn btn-danger d-flex justify-content-center align-items-center w-100"
                            disabled={enviando}
                            onClick={()=> handleDelete(data.id)}
                        >
                            {enviando ? (
                                <>
                                    <span 
                                        className="spinner-border spinner-border-sm me-2" 
                                        role="status" 
                                        aria-hidden="true"
                                    ></span>
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                Eliminar
                                </>
                            )}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default ModalEliminar;