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
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';

const ReservacionesPage = () => {
  const [confirmado, setConfirmado] = useState(false);
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
  const [mesasdisponibles, SetMesasDisponibles] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

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

    Mesas.map((mesa) => {

      mesasdisponibles[mesa.mesa] = mesa.disponibles;
  
    });

  }

  const getreservadas = () => {

    let treservadas = 0;

    for (const [key, value] of Object.entries(reservamesas)) {

      treservadas = treservadas + value;

    }

    SetReservadas(treservadas);

  }

  const assignaMesa = async (mesa,disponibles,mesaid) => {
    
    console.log(`Asignando mesa ${mesa}... ${reservamesas[mesa]}`);

    const mesaRef = doc(db, "restaurante", mesaid);

    const mesaList = await getDoc(mesaRef);

    const Mesa = {

      id: mesaList.id,

      ...mesaList.data(),

    };

    if(Mesa.disponibles>0) {

      reservamesas[mesa] = reservamesas[mesa] + 1;

      //SetReservaMesas(reservamesas[mesa]);

      getreservadas();

      mesasdisponibles[mesa] = Mesa.disponibles - 1;

      const mdisp = document.getElementById(`disponible-mesa${mesa}`);

      mdisp.innerHTML = mesasdisponibles[mesa];

      console.log(reservamesas);

      console.log(`Mesa ${mesa} asignada`);

      const mesaUpdate = await updateDoc(mesaRef, {

        ocupadas: Mesa.ocupadas + 1,

        disponibles: Mesa.disponibles - 1,

      });

    }

  }

  const removeMesa = async (mesa,disponibles,mesaid) => {
        
    console.log(`Eliminando mesa ${mesa}... ${reservamesas[mesa]}, disponibles ${disponibles}`);

    const mesaRef = doc(db, "restaurante", mesaid);

    const mesaList = await getDoc(mesaRef);

    const Mesa = {

      id: mesaList.id,

      ...mesaList.data(),

    };

    if(Mesa.ocupadas>0) {

      reservamesas[mesa] = reservamesas[mesa] - 1;

      //SetReservaMesas(reservamesas[mesa]);

      mesasdisponibles[mesa] = Mesa.disponibles + 1;

      getreservadas();

      const mdisp = document.getElementById(`disponible-mesa${mesa}`);

      mdisp.innerHTML = mesasdisponibles[mesa];

      console.log(`Mesa ${mesa} eliminada`);

      console.log(reservamesas);

      const mesaUpdate = await updateDoc(mesaRef, {

        ocupadas: Mesa.ocupadas - 1,

        disponibles: Mesa.disponibles + 1,

      });

    }

  }

  useEffect(() => {
    
    listaMesas();

  }, []); 

  const handleClick = () => {

  const email = document.getElementById('txtEmail').value;
  
  const nombre = document.getElementById('txtNombre').value;
  
  const fecha = document.getElementById('txtFecha').value;
  
  const hora = document.getElementById('txtHora').value;

  if(!email) {
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe agregar un email electrónico!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });

    setConfirmado(false);

  } if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Correo electrónico no es válido!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });

    setConfirmado(false);

  }
    
    //setConfirmado(true);

  };

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
                            <h1 id={`disponible-mesa${mesa.mesa}`}>{(mesasdisponibles[mesa.mesa]>0) ? mesasdisponibles[mesa.mesa] : mesa.disponibles}</h1>
                            Disponibles
                          </div>
                          <div className="vr" />
                          <div className="p-2 justify-content-center text-center align-middle">
                            <Button type="button" variant="outline-success" style={{ width: '3rem' }} size="md" onClick={() => assignaMesa(mesa.mesa, mesa.disponibles, mesa.id)} disabled={ mesa.disponibles>0 ? false : true }><PlusCircleFill /></Button>
                            <Form.Control 
                              type="text"
                              size="md"
                              className="text-center"
                              readOnly
                              value={ (mesa.disponibles > 0) ? reservamesas[mesa.mesa] : 0}
                              style={{ width: '3rem' }}
                            />
                            <Button type="button" variant="outline-secondary" style={{ width: '3rem' }} size="md" onClick={() => removeMesa(mesa.mesa,mesa.total,mesa.id)} disabled={ reservamesas[mesa.mesa]==0 }><DashCircleFill /></Button>
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
                    <FloatingLabel  className="mb-1" label="*Correo Electrónico">
                      <Form.Control type="email" id="txtEmail" placeholder="cuenta@micorreo.com" />
                    </FloatingLabel>
                    <FloatingLabel  className="mb-1" label="Nombre">
                      <Form.Control type="text" id="txtNombre" placeholder="Ingrese su Nombre" />
                    </FloatingLabel>
                  </div>
                  <div className="vr" />
                  <div className="p-2 text-center">
                    <FloatingLabel  className="mb-1" label="Fecha">
                      <Form.Control type="date" id="txtFecha" placeholder="Ingrese Fecha" />
                    </FloatingLabel>
                    <FloatingLabel  className="mb-1" label="Hora">
                      <Form.Control type="time" id="txtHora" placeholder="Ingrese Hora" />
                    </FloatingLabel>
                  </div>
                  <div className="vr" />
                  <div className="p-2 text-center">
                    <ButtonGroup className="me-2">
                      <Button variant="outline-success" disabled={ (reservadas > 0 ) ? false : true} onClick={!confirmado ? handleClick : null} type="button" size="sm" value="">Confirmar</Button>
                      <Button variant="outline-danger" type="button" size="sm" value="">Descartar</Button>
                    </ButtonGroup>
                  </div>
                </Stack>
              </Card.Text>
              <Card.Footer className="gap-2 justify-content-center text-center">
                <small className="text-muted">
                  *Campos obligatorios 
                  | Se enviará un correo de confirmación
                  | Se enviará un correo de cancelación en caso de no asistir
                  | <strong>Nos reservamos el derecho de admisión</strong>
                </small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default ReservacionesPage;