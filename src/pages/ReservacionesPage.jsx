import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import { db } from './../firebase/firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

const ReservacionesPage = () => {
  const [mesa1, SetMesa1] = useState(3);
  const [mesa2, SetMesa2] = useState(3);
  const [mesa3, SetMesa3] = useState(3);
  const [mesa4, SetMesa4] = useState(2);
  const [mesa5, SetMesa5] = useState(1);
  const [mesa6, SetMesa6] = useState(1);
  const [reservadas, SetReservadas] = useState(0);
  var Mesas = [];

  const listaMesas = async () => {

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

  }

  const assignaMesa = async (mesa) => {
      
    console.log(`Asignando mesa ${mesa}...`);

    const mesaRef = doc(db, "restaurante", mesa);

    const mesaUpdate = await updateDoc(mesaRef, {

      ocupadas: mesa.ocupadas + 1,

      disponibles: mesa.total - (mesa.ocupadas + 1),

    });

    console.log(`Mesa ${mesa} asignada`);

  }

  const removeMesa = async (mesa) => {
        
    console.log(`Eliminando mesa ${mesa}...`);

    const mesaRef = doc(db, "restaurante", mesa);

    const mesaUpdate = await updateDoc(mesaRef, {

      ocupadas: mesa.ocupadas - 1,

      disponibles: mesa.total - (mesa.ocupadas - 1),

    });

    console.log(`Mesa ${mesa} eliminada`);

  }

  listaMesas();

  return (
    <>
      <header className="row col">
            <h1>Reservar</h1>
      </header>
      <Container fluid>
        <Row className="justify-content-md-center">
          <CardGroup>
            <Card>
              <Card.Img variant="top" src="./assets/images/modelo.jpg" />
              <Card.Body>
                <Card.Title className="text-center">Dos personas</Card.Title>
                <Card.Text>
                  <Stack direction="horizontal" className="justify-content-center" gap={1}>
                    <div className="p-2 text-center">
                      <h1>{mesa1}</h1>
                      Disponibles
                    </div>
                    <div className="vr" />
                    <div className="p-2 justify-content-center text-center align-middle">
                      <Button type="button" variant="success" style={{ width: '3rem' }} size="md" onClick={() => (reservadas<mesa1) ? SetReservadas(reservadas+1) : SetReservadas(mesa1)}>+</Button>
                      <Form.Control 
                        type="text"
                        size="md"
                        className="text-center"
                        readOnly
                        value={reservadas}
                        style={{ width: '3rem' }}
                      />
                      <Button type="button" variant="secondary" style={{ width: '3rem' }} size="md" onClick={() => (reservadas>0) ? SetReservadas(reservadas-1) : SetReservadas(0)}>-</Button>
                    </div>
                  </Stack>
                </Card.Text>
                <Card.Footer className="card-footer d-grid gap-2">
                  <Button type="button" size="sm" onClick={() => assignaMesa(mesa1)} variant={mesa1>0 ? "outline-primary" : "outline-secondary"} disabled={mesa1>0 ? false : true} value={mesa1}>Reservar</Button>
                </Card.Footer>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="./assets/images/modelo.jpg" />
              <Card.Body>
                <Card.Title>Disponibles {mesa2}</Card.Title>
                <Card.Text>
                  Tres personas
                </Card.Text>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="./assets/images/modelo.jpg" />
              <Card.Body>
                <Card.Title>Disponibles {mesa3}</Card.Title>
                <Card.Text>
                  Cuatro personas
                </Card.Text>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="./assets/images/modelo.jpg" />
              <Card.Body>
                <Card.Title>Disponibles {mesa4}</Card.Title>
                <Card.Text>
                  Seis personas
                </Card.Text>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="./assets/images/modelo.jpg" />
              <Card.Body>
                <Card.Title>Disponibles {mesa5}</Card.Title>
                <Card.Text>
                  Ocho personas
                </Card.Text>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="./assets/images/modelo.jpg" />
              <Card.Body>
                <Card.Title>Disponibles {mesa6}</Card.Title>
                <Card.Text>
                  Diez personas
                </Card.Text>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container>
    </>
  )
}

export default ReservacionesPage;