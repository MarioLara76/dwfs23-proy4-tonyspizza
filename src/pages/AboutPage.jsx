import { Container, Row } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <>
      <header className="row col">
        <h1>¿Quiénes somos?</h1>
      </header>
      <Container fluid>
        <hr />
        <Row className="justify-content-md-center">
          Somos un emprendimiento local desde el año 2015, dedicado a la venta de pizzas y papas. Nuestro objetivo es brindar un producto de calidad, con ingredientes frescos y de primera calidad.

          Nuestra misión es brindar un servicio de excelencia, con un trato amable y cordial, para que nuestros clientes se sientan cómodos y satisfechos.

          Nuestra visión es seguir creciendo y expandirnos, para que cada vez más personas puedan disfrutar de nuestros productos.

          ¡Gracias por elegirnos! ¡Esperamos que disfruten de nuestras pizzas y papas!
        </Row>
      </Container>
    </>
  )
}

export default AboutPage;