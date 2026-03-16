const NotificacionStock = ({onClose,productos}) => {
    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
            <div className="toast show align-items-center text-bg-danger border-0 shadow">
                {productos?.map((p)=> (
                    <div key={p.id} className="d-flex">
                        <div className="toast-body">
                            ⚠ Stock Bajo <br />
                            El producto {p.producto} tiene stock bajo. Quedan: {p.stock} uds
                        </div>
                        <button
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={()=> onClose(p.id)}
                        ></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificacionStock;