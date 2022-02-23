import React, { useEffect, useState } from "react";
import "./styles.scss";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Immobile() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function loadImmobile() {
            const response = await api.get("/imoveis");
            setProperties(response.data);
        }
        loadImmobile();
    }, []);

    return (
        <section>
            <div className="airbnbContainer">
                <div className="airbnbContainer__list">
                    {properties.map((properties) => (
                        <Link key={properties.id} to={`/property/${properties.id}`}>
                            <div className="airbnbContainer__list__card">
                                <h1>{properties.name}</h1>
                                <p>Tipo: {properties.type}</p>
                                <p>Hóspedes aceitos: {properties.guests}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <div className="airbnbContainer__new">
                    <Link className="btn " to="/new">
            Adicionar um imóvel
                    </Link>
                </div>
            </div>
        </section>
    );
}
