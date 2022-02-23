import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import "./styles.scss";

export default function New() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [adress, setAdress] = useState("");
    const [district, setDistrict] = useState("");
    const [guests, setGuests] = useState("");
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState("");
    const [shared, setShared] = useState("");

    const modalConfimation = () => {
        Swal.fire({
            title: "Imóvel adicionado com sucesso!",
            timer: 2000,
            icon: "success",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.dismiss || result.isConfirmed) {
                navigate("/");
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!name || !type || !adress || !district || !guests || !description || !available || !shared){
            Swal.fire({
                title: "Digite os campos obrigatórios*",
                timer: 2000,
                icon: "error",
                confirmButtonText: "Ok",});
        } else {
            await api.post("/imoveis", {
                name,
                type,
                adress,
                district,
                guests,
                description,
                available,
                shared,
            });
            modalConfimation();
        }
    };
    return (
        <div className="container">
            <div className="content">
                <form>
                    <label htmlFor="imovel">Adicione um imóvel</label>
                    <input
                        required
                        value={name}
                        type="nome"
                        id="nome"
                        placeholder="Nome*"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        required
                        value={type}
                        type="tipo"
                        id="tipo"
                        placeholder="Tipo*"
                        onChange={(event) => setType(event.target.value)}
                    />
                    <input
                        required
                        value={adress}
                        type="endereço"
                        id="endereço"
                        placeholder="Endereço*"
                        onChange={(event) => setAdress(event.target.value)}
                    />
                    <input
                        required
                        value={district}
                        type="bairro"
                        id="bairro"
                        placeholder="Bairro*"
                        onChange={(event) => setDistrict(event.target.value)}
                    />
                    <input
                        required
                        value={guests}
                        type="hospedes"
                        id="hospedes"
                        placeholder="Hóspedes*"
                        onChange={(event) => setGuests(event.target.value)}
                    />
                    <input
                        required
                        value={description}
                        type="descricao"
                        id="descricao"
                        placeholder="Descrição*"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <input
                        required
                        value={available}
                        type="disponibilidade"
                        id="disponibilidade"
                        placeholder="Disponibilidade*"
                        onChange={(event) => setAvailable(event.target.value)}
                    />
                    <input
                        required
                        value={shared}
                        type="compartilhado"
                        id="compartilhado"
                        placeholder="Compartilhado*"
                        onChange={(event) => setShared(event.target.value)}
                    />
                </form>

                <button
                    className="content__btn"
                    type="button"
                    onClick={(event) => handleSubmit(event)}
                >
          Adicionar
                </button>
            </div>
            <div className="airbnbContainer__back">
                <Link className="btn " to="/">
          Voltar
                </Link>
            </div>
        </div>
    );
}
