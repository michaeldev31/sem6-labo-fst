import { useState, useEffect  } from "react";
import axios from "axios";

export default function ListaAlbumsAxios() {

    const [albumes, setAlbumes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then((res) => setAlbumes(res.data))
            .catch(() => setError("No se pudo cargar los albumes"));
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Albumes (axios)</h2>
            <ul>
                {albumes.map((a) => (
                    <li key={a.id}> {a.title} </li>
                ))}
            </ul>
        </div>
    );
}