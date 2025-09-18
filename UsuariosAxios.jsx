import { useState, useEffect  } from "react";
import axios from "axios";

export default function UsuariosAxios() {

    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUsuarios(res.data))
            .catch(() => setError("No se pudo cargar usuarios"));
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Usuarios (axios)</h2>
            <ul>
                {usuarios.map((u) => (
                    <li key={u.id}> {u.name} - {u.email} </li>
                ))}
            </ul>
        </div>
    );
}