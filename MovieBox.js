import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';


const API_IMG = "https://image.tmdb.org/t/p/w500" // Constante pour l'URL de l'API
const MovieBox = (result) => {

    const [show, setShow] = useState(false);  // Déclaration du state pour afficher/masquer la modal

    const handleShow = () => setShow(true);  // Fonction pour afficher la modal
    const handleClose = () => setShow(false); // Fonction pour masquer la modal

    return (
        <div className="card">
            {/* Image de la carte /} */}
            <img className="card-img-top" src={API_IMG + result.poster_path} />
            <div className="card-body">
                {/* / Bouton pour afficher la modal */}
                <button type="button" className="btn btn-dark" onClick={handleShow}>
                    Voir
                </button>
                {/* Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{result.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Image de la modal */}
                        <img
                            className="card-img-top"
                            src={API_IMG + result.backdrop_path}
                        />
                        <h3 className="card-title">{result.title}</h3>
                        <h4>Date de sortie : {result.release_date}</h4>
                        <br></br>
                        <h6>{result.overview}</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );

}
export default MovieBox;