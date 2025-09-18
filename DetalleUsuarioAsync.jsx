import { useState, useEffect  } from "react";
import axios from "axios";

export default function DetalleUsuarioAsync() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargado] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
                setUsuario(res.data);
            } catch {
                setError("Error al cargar usuario");
            }finally {
                setCargado(false);
            }
        };
        cargarUsuarios();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Detalle de usuario (axios + async/await)</h2>
            {usuario && (
                <ul>
                    <li>
                        {usuario.name} - {usuario.email} - {usuario.phone}
                    </li>
                </ul>
            )}
        </div>
    );
}