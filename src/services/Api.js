const url = "https://gestioninventario.pythonanywhere.com/";
// const url = "http://127.0.0.1:8000/";


const api = async (endpoint, method = "GET",  body = null) => {
    let access = sessionStorage.getItem("access");
    const refresh = sessionStorage.getItem("refresh");

    const options = {
        method,
        headers: {}
    };

    // 🔒 Agregar token sólo si existe y no es login/registrar
    if (!["login/", "registrar/"].includes(endpoint) && access) {
        options.headers["Authorization"] = `Bearer ${access}`;
    }

    // 🧠 Detectar si el body es JSON o FormData
    if (body && !(body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
        // 🚫 NO PONER headers de Content-Type
        options.body = body;
    }

    try {
        let response = await fetch(`${url}${endpoint}`, options);

        // 🔁 Si el token expiró, intentar refrescar
        if (response.status === 401 && refresh) {
            const refreshResponse = await fetch(`${url}accounts/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                sessionStorage.setItem("access", refreshData.access);
                access = refreshData.access;

                options.headers["Authorization"] = `Bearer ${access}`;
                response = await fetch(`${url}${endpoint}`, options);
            } else {
                throw new Error("Refresh token expirado. Requiere login.");
            }
        }

        // 🧩 Manejar errores HTTP
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                throw new Error(`Error ${response.status}`);
            }
            throw new Error(JSON.stringify(errorData));
        }

        return response;

    } catch (error) {
        console.error("Error en la API:", error);
        throw error;
    }
};

export default api;
