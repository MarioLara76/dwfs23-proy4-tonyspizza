import { useState, useRef, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import { db } from './../firebase/firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { DashCircleFill, PlusCircleFill } from 'react-bootstrap-icons';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from 'sweetalert2';
import axios from 'axios';

const ReservacionesPage = () => {
  const [confirmado, setConfirmado] = useState(false);
  const [cancelado, setCancelado] = useState(false);
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

  const getByField = async (mesa) => {

    console.log(typeof mesa);

    console.log(`Buscando mesas, esta mesa es ${mesa}`)

    const mesaRef = query(collection(db, "restaurante"), where("mesa", "==", Number(mesa)));

    const mesaList = await getDocs(mesaRef);

    var Mesa = null;

    mesaList.forEach((doc) => {

      Mesa = {
        id: doc.id,
        ...doc.data()
      };

    });

    console.log(`Mesa`);

    console.log(Mesa);

    return Mesa;

  }

  const removeMesa = async (mesa,disponibles,mesaid) => {
        
    console.log(`Eliminando mesa ${mesa}... ${reservamesas[mesa]}, disponibles ${disponibles}`);

    if(mesaid>0){

      const mesaRef = doc(db, "restaurante", mesaid);

      const mesaList = await getDoc(mesaRef);

      const Mesa = {

        id: mesaList.id,
  
        ...mesaList.data(),
  
      };

      console.log(`Mesa ${mesa}`);

      console.log(Mesa);

    } else {

      console.log(typeof mesa);

      console.log(`Removiendo todas las mesas, esta mesa es ${mesa}`)

      const mesaRef = query(collection(db, "restaurante"), where("mesa", "==", Number(mesa)));

      const mesaList = await getDocs(mesaRef);

      var Mesa = null;

      mesaList.forEach((doc) => {

        Mesa = {
          id: doc.id,
          ...doc.data()
        };

      });

      console.log(`Mesa ${mesa}`);

      console.log(Mesa);

      mesaid = Mesa.id;

      console.log(`Nuevo ID: ${mesaid}`);

    }

    if(Mesa.ocupadas>0) {

      console.log(`Removiendo mesa ${mesa}, ocupadas: ${Mesa.ocupadas}, disponibles: ${Mesa.disponibles}`);

      reservamesas[mesa] = reservamesas[mesa] - 1;

      mesasdisponibles[mesa] = Mesa.disponibles + 1;

      getreservadas();

      const mdisp = document.getElementById(`disponible-mesa${mesa}`);

      mdisp.innerHTML = mesasdisponibles[mesa];

      console.log(`Mesa ${mesa} eliminada`);

      console.log(reservamesas);

      const mesaRefUpdating = doc(db, "restaurante", mesaid);

      await updateDoc(mesaRefUpdating, {

        ocupadas: Mesa.ocupadas - 1,

        disponibles: Mesa.disponibles + 1,

      });

      console.log(`Mesa ${mesa} removida, ocupadas: ${Mesa.ocupadas}, disponibles: ${Mesa.disponibles}`);

    }

  }

  /*
  setTimeout(() => {
      
      console.log(`Reservadas ${reservadas}`);

  },1000);
  */
  
  const reservaciones = async () => {

    const reservacionesList = await getDocs(collection(db, "reservas"));

    const Listareservacion = reservacionesList.docs.map((reservacion) => {

      return {

        id: reservacion.id,

        ...reservacion.data(),

      }

    });

    const listaReservaciones = document.getElementById('ListaReservaciones');

    const thisTable = document.getElementById('tblReservaciones');

    thisTable.getElementsByTagName("tbody")[0].innerHTML = "";

    console.info(Listareservacion); //Limpiar Tabla de reservaciones

    for (const [key, value] of Object.entries(Listareservacion)) {

      const thisMesa = await getByField(value.mesas[0].mesa);

      console.log(`thisMesa es`);

      console.log(thisMesa);

      const item = `<tr>
      <td>${value.nombre}</td>
      <td style={{textalign:center}}>${value.fecha}</td>
      <td style={{textalign:center}}>${value.hora}</td>
      <td style={{textalign:center}}>${value.mesas[0].mesa} (${thisMesa.descripcion})</td>
      <td style={{textalign:center}}>${value.mesas[0].cantidad}</td>
      </tr>`;

      listaReservaciones.innerHTML += item;

      console.log(thisMesa.descripcion);

    }
  
  }

  const descartar = async () => {

    Swal.fire({

      title: "¿Deseas cancelar la reservación?",

      html: `<p class="text-danger">No será posible recuperar las mesas reservadas</p>`,

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#1D8005",

      cancelButtonColor: "#3085d6",

      confirmButtonText: "Sí, cancelo.",

      cancelButtonText: "No, continuaré.",

      preConfirm: async () => {

        console.info(`Se cancela la reservación`);

        for (const [key, value] of Object.entries(reservamesas)) {

          if( value>0 ) {

            console.log(`Removiendo Mesa ${key} reservada ${value}`);

            await removeMesa(key,0,0);

          }

        }

      }

    }).then((result) => {

      console.log(`Result es ${result.isConfirmed}`)

      if (result.isConfirmed)

        console.log(`Cancelación confirmada`);

    });

  }

  useEffect(() => {
    
    listaMesas();

    reservaciones();

    const hoy = document.getElementById('txtFecha');

    console.log(hoy);

    const ahora = document.getElementById('txtHora');

    const dtnow = new Date();

    //const dtDate = dtnow.toLocaleString('es-MX');

    const dtTime = dtnow.toLocaleString('es-MX', {
      hour: 'numeric',
      minute: 'numeric',
    });

    //hoy.value = dtDate;

    ahora.value = dtTime;

  }, []); 

  const showMessage = (type,icon,title,text,footer) => {

    /*Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe agregar un email electrónico!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });*/
      
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        footer: footer,
        showConfirmButton: (type=='confirm') ? true : false,
        timer: 1800
      });

  }

  const validaEmail = async (email) => {
    
    const apiURL = import.meta.env.VITE_ABSTRACT_EMAILVALIDATION_APIURL;

    console.log(`URL is ${apiURL}`);

    const apiKey = import.meta.env.VITE_ABSTRACT_EMAILVALIDATION_APIKEY;

    console.log(`API KEY is ${apiKey}`);

    try {

        const response = await axios.get(`${apiURL}?api_key=${apiKey}&email=${email}&auto_correct=false`);

        if(response.data) {

          console.log(response.data);

          if(response.data.deliverability !== "DELIVERABLE")

            return false;

          return true;

        }

    } catch (error) {

      return error;

    }
    
  }

  const handleClick = () => {

    let validated = true;

    const email = document.getElementById('txtEmail').value;
    
    const nombre = document.getElementById('txtNombre').value;
    
    const fecha = document.getElementById('txtFecha').value;
    
    const hora = document.getElementById('txtHora').value;

    console.log(`Email es ${email}`);

    if(email === null || email === "") {
      
      showMessage('confirm','error','Whoops!','Correo electrónico es requerido','Ingresa una cuenta de correo electrónico válida');

      setConfirmado(false);

      validated = false;

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {

      showMessage('confirm','error','Whoops!','Correo electrónico no es valido','Revisa el correo electrónico ingresado');

      /*Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo electrónico no es válido!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });*/

      setConfirmado(false);

      validated = false;

    } else if(nombre === null || nombre === "") {
      
      showMessage('warning','error','Whoops!','Nombre es requerido','Ingresa tu nombre');

      setConfirmado(false);

      validated = false;

    } else if (nombre.length < 3) {

      showMessage('warning','error','Whoops!','Nombre no es válido','Ingresa un nombre válido');

      setConfirmado(false);

      validated = false;

    } else if( fecha === null || fecha === "") {
      
      showMessage('warning','error','Whoops!','Fecha es requerida','Ingresa una fecha válida');

      setConfirmado(false);

      validated = false;

    } else if( hora === null || hora === "") {
      
      showMessage('warning','error','Whoops!','Hora es requerida','Ingresa una hora válida');

      setConfirmado(false);

      validated = false;

    } else if(reservadas === 0) {

      showMessage('warning','error','Whoops!','No hay mesas reservadas','Selecciona al menos una mesa');

      setConfirmado(false);

      validated = false;

    }

    console.log(`Confirmado es ${confirmado}`);

    if(validated!==false) {

      Swal.fire({

        title: "¿Deseas confirmar la reservación?",

        html: `<p>El correo electrónico ingresado es <strong>${email}</strong></p><p>La reservación es a nombre de <i>${nombre}</i> <br>el día <b>${fecha} a las ${hora}</b>,<br> reservando ${reservadas} mesa${(reservadas>1)?'s':''}.</p>`,

        icon: "question",

        showCancelButton: true,

        confirmButtonColor: "#1D8005",

        cancelButtonColor: "#3085d6",

        confirmButtonText: "Sí, de acuerdo.",

        cancelButtonText: "Aún no",

        preConfirm: async () => {

          validaEmail(email).then((response) => {

            console.log(`Validating email... ${response}`);
    
            const reservas = [];
      
            for (const [key, value] of Object.entries(reservamesas)) {
      
              if(value>0) {
      
                reservas.push({ mesa: key, cantidad: value });
      
              }
      
            }
      
            console.log(reservas);
      
            const reservaRef = collection(db, "reservas");
      
            const newReserva = addDoc(reservaRef, {
      
              email: email,
      
              nombre: nombre,
      
              fecha: fecha,
      
              hora: hora,
      
              mesas: reservas,
      
            });
      
            setConfirmado(true);

            showMessage('confirm','success','Reservación','Reservación confirmada','Se ha enviado un correo de confirmación');
    
          }).catch((error) => {
    
            showMessage('confirm','error','Whoops!','Verificación de correo falló','Revisa el correo electrónico ingresado');
    
            setConfirmado(false);
    
            console.log(error);
      
          }).finally(() => {
    
            console.log('Validación de correo finalizada y reservación confirmada');
    
          });
        
        }

      }).then((result) => {

        if (result.isConfirmed) {

          reservaciones();

          console.log(`Registro exitoso`);

        }

      });
      
    }
    
  }

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
                      <Button variant="outline-danger" type="button" size="sm" value="" onClick={!confirmado ? descartar : null} disabled={ (reservadas > 0 ) ? ( !confirmado ? false : true) : false }>Descartar</Button>
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
        <hr />
        <Row className="justify-content-md-center">
          <Card>
            <Card.Header className="text-center">Reservaciones</Card.Header>
            <Card.Body>
            <Table responsive striped bordered hover id="tblReservaciones">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Mesa reservada</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody id="ListaReservaciones">
              </tbody>
            </Table>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default ReservacionesPage;