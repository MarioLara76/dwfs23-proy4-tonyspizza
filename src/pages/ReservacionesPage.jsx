import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { db } from './../firebase/firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

const ReservacionesPage = () => {
  const [mesa1, SetMesa1] = useState(3);
  const [mesa2, SetMesa2] = useState(3);
  const [mesa3, SetMesa3] = useState(3);
  const [mesa4, SetMesa4] = useState(2);
  const [mesa5, SetMesa5] = useState(1);
  const [mesa6, SetMesa6] = useState(1);
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
      <CardGroup>
        <Card style={{ width: '18rem' }} >
          <Card.Img variant="top" src="./assets/images/modelo.jpg" />
          <Card.Body>
            <Card.Title>Disponibles {mesa1}</Card.Title>
            <Card.Text>
              Dos personas
            </Card.Text>
            <Button size="sm" onClick={() => assignaMesa(mesa1)} variant={mesa1>0 ? "outline-primary" : "outline-secondary"} disabled={mesa1>0 ? false : true} value={mesa1}>Reservar</Button>
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
    </>
  )
}

export default ReservacionesPage;