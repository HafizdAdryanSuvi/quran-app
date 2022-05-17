import React from 'react';
import {Card, Container} from "react-bootstrap";
import logo from "../logo.svg"


const AboutPage=()=> {
    return (
        <Container style={{marginTop:"2rem"}}>
            <Card border="light">
                <Card.Img variant="top" src={logo} style={{width:'100%', height:'20rem'}}/>
                <Card.Title className="text-primary">
                    <h1>Thanks for using this app</h1>
                </Card.Title>
                <Card.Body>
                    <h4>Made with React JS and Styled with React-Bootstrap</h4>
                    <h4>API was taken from <a href="https://quran.api-docs.io/v4/getting-started/introduction">Quran.com API</a></h4>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AboutPage;