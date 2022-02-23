import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";
import "./styles.scss";

function MyVerticallyCenteredModal({
    feedback,
    setFeedback,
    addFeedback,
    ...props
}) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
          Novo comentário
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control
                            onChange={(event) =>
                                setFeedback({ ...feedback, title: event.target.value })
                            }
                            type="text"
                            placeholder="Titulo"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            onChange={(event) =>
                                setFeedback({ ...feedback, host: event.target.value })
                            }
                            type="text"
                            placeholder="Digite seu nome"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="note">
                        <Form.Label>Nota</Form.Label>
                        <Form.Control
                            onChange={(event) =>
                                setFeedback({ ...feedback, note: event.target.value })
                            }
                            type="number"
                            placeholder="Nota"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="text">
                        <Form.Label>Comentários</Form.Label>
                        <Form.Control
                            onChange={(event) =>
                                setFeedback({ ...feedback, text: event.target.value })
                            }
                            type="text"
                            placeholder="Digite seu comentário"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            onChange={(event) =>
                                setFeedback({ ...feedback, date: event.target.value })
                            }
                            type="text"
                            placeholder="Data"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <Button
                        onClick={() => {
                            addFeedback();
                            props.onHide();
                        }}
                    >
            Adicionar
                    </Button>
                    <Button onClick={props.onHide}>Fechar</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

MyVerticallyCenteredModal.propTypes = {
    feedback: PropTypes.object,
    setFeedback: PropTypes.func,
    addFeedback: PropTypes.func,
    onHide: PropTypes.func,
};

export default function Property() {
    const [modalShow, setModalShow] = useState(false);
    const [property, setProperty] = useState();
    const [feedback, setFeedback] = useState({});
    const { id } = useParams();

    const addFeedback = async () => {
        try {
            await api.post(`/imoveis/${id}/feedback`, feedback).then(() =>
                Swal.fire({
                    title: "Comentário adicionado com sucesso!",
                    timer: 2000,
                    icon: "success",
                    confirmButtonText: "Ok",
                })
            );
        } catch (error) {
            throw new Error(error);
        }
    };

    const getProperty = useCallback(() => {
        api
            .get(`/imoveis/${id}/feedback`)
            .then((response) => {
                setProperty(response.data);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }, [id]);
    useEffect(() => {
        if (id) {
            getProperty();
        }
        if (!modalShow) {
            getProperty();
        }
    }, [id, modalShow, getProperty]);

    return (
        <>
            <section>
                <div className="detailsContainer">
                    {property && (
                        <div className="propertyDetails">
                            <div className="propertyDetails__description">
                                <h1 className="propertyDetails__description__title">
                                    {property.name}
                                </h1>
                                <div className="propertyDetails__description__font">
                                    <p>Tipo: {property.type}</p>
                                    <p>Endereço: {property.adress}</p>
                                    <p>Bairro: {property.district}</p>
                                    <p>Hóspedes: {property.guests}</p>
                                    <p>Descrição: {property.description}</p>
                                    <p>Disponibilidade: {property.available}</p>
                                    <p>Compartilhado: {property.shared}</p>
                                </div>
                            </div>
                            <div className="propertyDetails__feedbacks">
                                <div className="propertyDetails__feedbacks__cardList">
                                    <h1>Comentários</h1>
                                    {property.feedbacks.map((feedback) => (
                                        <div
                                            key={feedback.id}
                                            className="propertyDetails__feedbacks__cardList__card"
                                        >
                                            <div className="propertyDetails__feedbacks__cardList__card__title">
                                                <h2>Título: {feedback.title}</h2>
                                                <span>Data: {feedback.date}</span>
                                            </div>
                                            <div className="propertyDetails__feedbacks__cardList__card__name">
                                                <p>Nome: {feedback.host}</p>
                                                <span>Nota: {feedback.note}</span>
                                            </div>
                                            <p className="propertyDetails__feedbacks__cardList__card__comment">
                        Comentário: {feedback.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <button className="my-3 btn" onClick={() => setModalShow(true)}>
                  Adicionar comentário
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="airbnbContainer__back">
                    <Link className="btn " to="/">
            Voltar
                    </Link>
                </div>
            </section>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setFeedback={setFeedback}
                feedback={feedback}
                addFeedback={addFeedback}
            />
        </>
    );
}

