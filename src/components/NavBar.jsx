import { useState } from 'react';
import Button  from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Offcanvas  from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom' //Para navegar entre pages

const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="false" className="bg-body-tertiary mb-3" fixed="top">
                <Container fluid>
                    <Row>
                        <Col xs={12} md={6} className="justify-content-center">
                            <Image src="./assets/images/tonnys_logo.jpg" alt="Tonny\'s Pizza Logo" roundedCircle  width={120} />
                        </Col>
                    </Row>
                    <Navbar.Brand href="#"><h3 className="fw-bolder fst-italic">Tony's Pizza</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand"  onClick={handleShow} />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar-expand"
                    aria-labelledby="offcanvasNavbarLabel-expand"
                    placement="end"
                    show={show} 
                    onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton>
                            <img src="./assets/images/tonnys_logo.jpg" alt="Tonny\'s Pizza Logo" width="70" height="70" className="d-inline-block align-text-top" />
                            <Offcanvas.Title>
                                Tony's Pizza
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <NavLink to="/home" className="nav-link" aria-current="page" onClick={handleClose} >Inicio</NavLink>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <NavLink to="/about" className="nav-link" aria-current="page" onClick={handleClose} >Nosotros</NavLink>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <NavLink to="/menu" className="nav-link" aria-current="page" onClick={handleClose} >Men&uacute;</NavLink>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <NavLink to="/reservaciones" className="nav-link" aria-current="page" onClick={handleClose} >Reservar</NavLink>
                                </ListGroup.Item>
                            </ListGroup>
                        </Offcanvas.Body>
                        <div className="offcanvas-footer">
                            @2024 - Omniverse, Inc.
                        </div>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar