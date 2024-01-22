import React, { createElement } from 'react';
import { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { db } from './../firebase/firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { DashCircleFill, PlusCircleFill } from 'react-bootstrap-icons';

const ReservacionesPage = () => {
  /*const [mesa1, SetMesa1] = useState(3);
  const [mesa2, SetMesa2] = useState(3);
  const [mesa3, SetMesa3] = useState(3);
  const [mesa4, SetMesa4] = useState(2);
  const [mesa5, SetMesa5] = useState(1);
  const [mesa6, SetMesa6] = useState(1);
  */
  const [reservadas, SetReservadas] = useState(0);
  const [thisListMesas, SetThisListMesas] = useState([]);
  const [reservamesas, SetReservaMesas] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });


  /*const listaMesas = async () => {

    console.log(`Recuperando mesas disponibles...`);
    
    const mesasList = await getDocs(collection(db, "restaurante"));

    Mesas = mesasList.docs.map((mesa) => {
      return {
        id: mesa.id,
        ...mesa.data(),
      }
    });

    console.log(Mesas);

    Mesas.map((mesa) => {

      if (mesa.mesa == "Dos personas") {

        SetMesa1(mesa.disponibles);

      }

      if (mesa.mesa == "Tres personas") {

        SetMesa2(mesa.disponibles);

      }

      if (mesa.mesa == "Cuatro personas") {

        SetMesa3(mesa.disponibles);

      }

      if (mesa.mesa == "Seis personas") {
          
        SetMesa4(mesa.disponibles);
  
      }

      if (mesa.mesa == "Ocho personas") {
            
        SetMesa5(mesa.disponibles);
    
      }

      if (mesa.mesa == "Diez personas") {
              
        SetMesa6(mesa.disponibles);
      
      }

    });

  }*/

  const listaMesas = async () => {

    console.log(`Recuperando mesas disponibles...`);
    
    const mesasList = await getDocs(collection(db, "restaurante"));

    const Mesas = mesasList.docs.map((mesa) => {
      return {
        id: mesa.id,
        ...mesa.data(),
      }
    });

    console.log(Mesas);

    SetThisListMesas(Mesas);

  }

  const getreservadas = () => {

    let treservadas = 0;

    for (const [key, value] of Object.entries(reservamesas)) {

      treservadas = treservadas + value;

    }

    SetReservadas(treservadas);

  }

  const assignaMesa = async (mesa,disponibles) => {
    
    console.log(`Asignando mesa ${mesa}... ${reservamesas[mesa]}`);

    if(reservamesas[mesa]<disponibles) {

      reservamesas[mesa] = reservamesas[mesa] + 1;

      //SetReservaMesas(reservamesas[mesa]);

    }

    getreservadas();

    console.log(reservamesas);
    /*const mesaRef = doc(db, "restaurante", mesa);

    const mesaUpdate = await updateDoc(mesaRef, {

      ocupadas: mesa.ocupadas + 1,

      disponibles: mesa.total - (mesa.ocupadas + 1),

    });*/

    console.log(`Mesa ${mesa} asignada`);

  }

  const removeMesa = async (mesa,disponibles) => {
        
    console.log(`Eliminando mesa ${mesa}... ${reservamesas[mesa]}, disponibles ${disponibles}`);

    if(reservamesas[mesa]<=disponibles && reservadas>0) {

      reservamesas[mesa] = reservamesas[mesa] - 1;

      //SetReservaMesas(reservamesas[mesa]);

    }
      
    getreservadas();

    /*const mesaRef = doc(db, "restaurante", mesa);

    const mesaUpdate = await updateDoc(mesaRef, {

      ocupadas: mesa.ocupadas - 1,

      disponibles: mesa.total - (mesa.ocupadas - 1),

    });*/

    console.log(`Mesa ${mesa} eliminada`);

  }

  useEffect(() => {
    
    listaMesas();

    console.log(thisListMesas);

  }, []); 

  return (
    <>
      <header className="row col">
            <h1>Reservar</h1>
      </header>
      <Container fluid>
        <Row className="justify-content-md-center">
          <CardGroup id="listaMesas">
            {
              thisListMesas.map((mesa) => {
                return (
                  <Card key={`Mesa${mesa.mesa}`}>
                    <Card.Img variant="top" src="../assets/images/modelo.jpg" />
                    <Card.Body>
                      <Card.Title className="text-center">{mesa.descripcion}</Card.Title>
                      <Card.Text>
                        <Stack direction="horizontal" className="justify-content-center" gap={1}>
                          <div className="p-2 text-center">
                            <h1>{mesa.disponibles}</h1>
                            Disponibles
                          </div>
                          <div className="vr" />
                          <div className="p-2 justify-content-center text-center align-middle">
                            <Button type="button" variant="outline-success" style={{ width: '3rem' }} size="md" onClick={() => assignaMesa(mesa.mesa, mesa.disponibles)} ><PlusCircleFill /></Button>
                            <Form.Control 
                              type="text"
                              size="md"
                              className="text-center"
                              readOnly
                              value={ (reservamesas[mesa.mesa] > 0) ? reservamesas[mesa.mesa] : 0}
                              style={{ width: '3rem' }}
                            />
                            <Button type="button" variant="outline-secondary" style={{ width: '3rem' }} size="md" onClick={() => removeMesa(mesa.mesa,mesa.total)}><DashCircleFill /></Button>
                          </div>
                        </Stack>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })
            }
          </CardGroup>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Resumen</Card.Title>
              <Card.Text>
                <Stack direction="horizontal" className="justify-content-center" gap={3}>
                  <div className="p-2 text-center">
                    <h1>{reservadas}</h1>
                    Reservadas
                  </div>
                  <div className="vr" />
                  <div className="p-2 text-center">
                    <Row>
                      <Col>
                        <Form>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">
                              *Email:
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control id="txtEmail" type="email" placeholder="email@example.com" required/>
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4">
                              Nombre:
                            </Form.Label>
                            <Col sm="8">
                              <Form.Control id="txtNombre" type="text" placeholder="Nombre Completo" />
                            </Col>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                </Stack>
              </Card.Text>
              <Card.Footer className="gap-2 justify-content-center text-center">
                <ButtonGroup className="me-2">
                  <Button variant="outline-success" type="button" size="sm" value="">Confirmar</Button>
                  <Button variant="outline-danger" type="button" size="sm" value="">Descartar</Button>
                </ButtonGroup>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default ReservacionesPage;