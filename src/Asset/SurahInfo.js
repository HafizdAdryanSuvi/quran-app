import React, { useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Card, Container} from "react-bootstrap";

const SurahInfo=()=> {
    const {id}=useParams()
    const [info, setInfo]=useState([]);
    const [surah, setSurah]= useState([])


    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/chapters/" + id + "/info?language=id")
            .then((res)=>{
                setInfo(res.data.chapter_info)
            })
            .catch((error)=>{
                console.log(error, 'error handle info')
            })
        axios.get("https://api.quran.com/api/v4/chapters/" + id)
            .then((res)=>{
                setSurah(res.data.chapter)
            })
            .catch((error)=>{
                console.log(error, 'error handle surah')
            })
    },[id])
    return (
        <Container style={{marginTop:"1rem"}}>
            <Card border="light">
                <Card.Title className="text-primary text-xxl" >
                    <h1> About Surah {surah.name_simple}</h1>
                </Card.Title>
                <Card.Body>
                    <Link className="text-decoration-none" to={"/surah/" + surah.id}>
                        <Button>
                            Back to surah
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
            <Card key={id} className="mt-1">
                <Card.Body>
                    <p className="text-start" dangerouslySetInnerHTML={{__html: info.text}}/>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SurahInfo;