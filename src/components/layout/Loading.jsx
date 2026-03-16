const Loading = () => {
    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
                gap: "1rem",
                textAlign: "center",
                padding: "2rem 0"
            }}
        >
            <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2.5rem", height: "2.5rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>

            <p style={{ fontSize: "1rem", margin: 0 }}>
                Cargando información...
            </p>
        </div>
    );
};

export default Loading;