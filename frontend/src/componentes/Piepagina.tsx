import '../componentes/Estilos/Piepagina.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';


export const Piepagina = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>                 
                    <Col className="text-center text-md-start">
                        <ul className="list-inline social-buttons">      
                            <li className="list-inline-item">
                                <a href="https://www.facebook.com">
                                    <FaFacebook></FaFacebook>
                                </a>
                            </li>
                            <li
                             className="list-inline-item">
                                <a href="https://www.instagram.com">
                                    <FaInstagram></FaInstagram>
                                </a>
                            </li>
                            <li
                             className="list-inline-item">
                                <a href="https://www.tiktok.com">
                                    <FaTiktok></FaTiktok>
                                </a>
                            </li>

                        </ul>
                    </Col>
                    <Col sm={12} md={6} lg={6} className="text-center text-md-end">
                        <span className="copyright">Copyright &copy; Oky - 2024</span>
                    </Col>
                </Row>  
            </Container>
        </footer>
    );
};

