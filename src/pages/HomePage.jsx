import React from 'react'

const HomePage = () => {
  return (
    <>
        <header className="row col">
            <h1>Bienvenido</h1>
        </header>
        <div className="row">
            <div className="col-6">
                <div className="row align-middle">
                    <div 
                        className="col-12 align-middle"
                        style={{
                            backgroundColor: "green",
                            color: "#ffffff",
                            textAlign: "center",
                        }}>
                            Traemos para usted los mejores platillos de la pizza italiana, con ingredientes frescos y de la mejor calidad.
                    </div>
                    <div className="align-middle"  style={{
                            color: "white",
                            backgroundColor: "white",
                    }}>
                        <img src="./assets/images/tonnys_logo.jpg" alt="Tonny\'s Pizza Logo" className="img-fluid rounded mx-auto d-block" />
                    </div>
                    <div 
                        className="col-12 align-middle"
                        style={{
                            backgroundColor: "red",
                            color: "#ffffff",
                            textAlign: "center",
                            marginBottom: 10,
                        }}>
                            Disfrute de un espacio de recreación y tranquilidad degustando una rica pizza, unas papas o molletes.
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img className="img-fluid rounded mx-auto d-block" src="../assets/images/pizza-2068272_1280.jpg" alt="Tonnys" />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 class="col-4 offset-8 text-end fst-italic fw-bolder">Las m&aacute;s deliciosas pizzas de la región</h3>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img className="img-fluid rounded mx-auto d-block" src="../assets/images/molletes.jpg" alt="Tonnys" />
                            <div className="carousel-caption d-none d-md-block">
                                <h3>Disfrute unos molletes preparados con productos de nuestros agricultores</h3>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="img-fluid rounded mx-auto d-block" src="../assets/images/papas.jpg" alt="Tonnys" />
                            <div className="carousel-caption d-none d-md-block">
                                <h3>... o tal vez unas ricas papas</h3>
                                <h3>&nbsp;</h3>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
            </div>
        </div>
    </>
  )
}

export default HomePage;