const Footer = () => {
    return (
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <svg className="bi" width={30} height={24}>
                <use xlinkHref="#bootstrap" />
              </svg>
            </a>
            <span className="text-muted">Desarrollo Web Full Stack 2023</span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="#">
                Proyecto académico de una aplicación web para reservaciones
              </a>
            </li>
            <li className="ms-3">
              Mario Lara Pérez
            </li>
            <li className="ms-3">
              Este es un proyecto de práctica, no es una aplicación comercial.
            </li>
          </ul>
        </footer>
      </div>
    );
  };
  
  export default Footer;