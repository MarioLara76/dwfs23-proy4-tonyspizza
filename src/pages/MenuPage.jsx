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
                                <p className="card-text">La pizza vegetariana es una de las más populares en todo el mundo. Su nombre proviene de la dieta vegetariana, y es que esta pizza es cien por ciento vegetales, sin lácteos ni carnes.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="../assets/images/molletes.jpg" className="card-img-top" alt="..." />
                    <p className="card-text"><small className="text-muted">Se requieren mínimo 30 minutos para su entrega</small></p>
                    <div className="card-body">
                        <h5 className="card-title fst-italic">Molletes</h5>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Mexicanos</h5>
                                <p className="card-text">
                                    Delicia mexicana preparados con ricos frijoles producidos en esta hermosa tierra, acompañados de queso fresco cortesía de productores locales y salsa preparada con varios tipos de chiles cuyo picor es singular. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="../assets/images/papas.jpg" className="card-img-top" alt="papas" />
                    <p className="card-text"><small className="text-muted">Se requieren mínimo 30 minutos para su entrega</small></p>
                    <div className="card-body">
                        <h5 className="card-title fst-italic">Papas</h5>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Horneadas</h5>
                                <p className="card-text">
                                    Papas frescas recién horneadas, acompañadas de una salsa de tomate preparada con tomates de la región, cebolla y chiles.
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Fritas</h5>
                                <p className="card-text">
                                    Papas frescas fritas, acompañadas de una salsa de tomate preparada con tomates de la región, cebolla y chiles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MenuPage;