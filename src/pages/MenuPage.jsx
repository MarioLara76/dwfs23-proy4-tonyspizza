import React from 'react'
const MenuPage = () => {
  return (
    <>
        <header className="row col">
            <h1>Nuestro Menú</h1>
        </header>
        <div className="row text-center">
            <div className="card-group">
                <div className="card">
                    <img src="../assets/images/pizza-2068272_1280.jpg" className="card-img-top" alt="..." />
                    <p className="card-text"><small className="text-muted">Se requieren mínimo 30 minutos para su entrega</small></p>
                    <div className="card-body">
                        <h5 className="card-title fst-italic">Pizzas</h5>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Peperoni</h5>
                                <p className="card-text">Esta pizza es la más popular y la más vendida en todo el mundo. Su nombre proviene del italiano peperoni, que significa pimiento, y es que este ingrediente es el que le da el toque especial a esta pizza.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Hawaiana</h5>
                                <p className="card-text">La pizza hawaiana es una de las más famosas en todo el mundo. Su nombre proviene de la isla de Hawái, en Estados Unidos, y es que esta pizza es originaria de este lugar.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Mexicana</h5>
                                <p className="card-text">La pizza mexicana es una de las más populares en todo el mundo. Su nombre proviene de México, y es que esta pizza es originaria de este lugar.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Italiana</h5>
                                <p className="card-text">La pizza italiana es una de las más populares en todo el mundo. Su nombre proviene de Italia, y es que esta pizza es originaria de este lugar.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Vegetariana</h5>
                                <p className="card-text">La pizza vegetariana es una de las más populares en todo el mundo. Su nombre proviene de la dieta vegetariana, y es que esta pizza es originaria de este lugar.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="../assets/images/molletes.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title fst-italic">Molletes</h5>
                    <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div className="card">
                    <img src="../assets/images/papas.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title fst-italic">Papas</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MenuPage;