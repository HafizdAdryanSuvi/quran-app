import React, {useState, useEffect} from "react";
import {Button, Container, Dropdown, ListGroup, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {GiHamburgerMenu} from "react-icons/gi"
import {Link} from "react-router-dom";
import axios from "axios";

const NavbarComponents = () => {
    const [juz, setJuz] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
            axios.get("https://api.quran.com/api/v4/juzs")
                .then((res) => {
                    setJuz(res.data.juzs)
                })
                .catch((error) => {
                    console.log(error, "Page Not Found")
                })
        }, []
    );

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="top" >
                <Container fluid>
                    <Link to="/">
                        <Navbar.Brand>Quran App</Navbar.Brand>
                    </Link>

                    <Button variant="primary" onClick={handleShow}>
                        <GiHamburgerMenu/>
                    </Button>

                    <Offcanvas show={show} onHide={handleClose} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    <NavDropdown
                                        className="text-decoration-none"
                                        id="basic-nav-dropdown"
                                        title="Juz">
                                        <div>
                                            {juz.map((item, index)=>(
                                                <NavDropdown.Item  key={index} ><Link to={"/juz/"+ item.id} className="text-decoration-none text-dark">Juz {item.id}</Link></NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <Link to="/surah" className="text-decoration-none text-dark">
                                        Daftar Surah
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    Tentang Surah
                                </ListGroup.Item>
                            </ListGroup>
                        </Offcanvas.Body>
                        <Button>
                            About
                        </Button>
                    </Offcanvas>

                </Container>
            </Navbar>
        </div>

    );
}

export default NavbarComponents;