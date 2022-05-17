import React, {useState, useEffect} from "react";
import {Button, Container, ListGroup, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {GiHamburgerMenu} from "react-icons/gi"
import {Link} from "react-router-dom";
import axios from "axios";

const NavbarComponents = () => {
    const [juz, setJuz] = useState([]);
    const [show, setShow] = useState(false);
    const [surah, setSurah] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
            axios.get("https://api.quran.com/api/v4/chapters?language=id")
                .then((res) => {
                    setSurah(res.data.chapters)
                })
                .catch((error) => {
                    console.log(error, "Page Not Found")
                })
        }, []
    );

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
                        <Offcanvas.Header className="bg-primary" closeButton>
                            <Offcanvas.Title className="text-white">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    <NavDropdown
                                        className="text-decoration-none"
                                        id="basic-nav-dropdown"
                                        title="Juz">
                                        <div>
                                            {juz.map((juzitem, index)=>(
                                                <NavDropdown.Item  key={index} ><Link to={"/juz/"+ juzitem.id} className="text-decoration-none text-dark">Juz {juzitem.id}</Link></NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <NavDropdown
                                        className="text-decoration-none"
                                        id="basic-nav-dropdown"
                                        title="Surah">
                                        <div>
                                            {surah.map((surahitem, index)=>(
                                                <NavDropdown.Item  key={index} ><Link to={"/surah/"+ surahitem.id} className="text-decoration-none text-dark">{surahitem.id}. {surahitem.name_simple}</Link></NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>
                                </ListGroup.Item>
                            </ListGroup>
                        </Offcanvas.Body>
                        <Link to="/about">
                            <Button style={{width:"25rem"}}>
                                About
                            </Button>
                        </Link>
                    </Offcanvas>
                </Container>
            </Navbar>
        </div>

    );
}

export default NavbarComponents;