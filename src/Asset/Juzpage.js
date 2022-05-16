import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";

const Juzpage=()=>{
    const {id} =useParams()
    const [ayatJuz, setAyatjuz]=useState([]);
    const [artiJuz, setArtiJuz]=useState([]);
    const [audioJuz, setAudioJuz]=useState([]);

    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=" + id)
            .then((res)=>{
                setAyatjuz(res.data.verses)
            })
            .catch((error)=>{
                console.log(error, ' error handle ayat juz')
            })
        axios.get("https://api.quran.com/api/v4/quran/translations/134?juz_number=" +id)
            .then((res)=>{
                setArtiJuz(res.data.translations)
            })
            .catch((error)=>{
                console.log(error, 'error handle arti juz')
            })
        axios.get("https://api.quran.com/api/v4/recitations/7/by_juz/" +id + "?per_page=999999999" )
            .then((res)=>{
                setAudioJuz(res.data.audio_files)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayat")
            })
    },[id])
    return (
        <Container>
                <Card border="light">
                    <Card.Body>
                        <div className=" row justify-content-center align-items-center text-xxl">
                            <Card.Title className="text-primary text-xxl" ><h1> JUZ {id}</h1></Card.Title>
                        </div>
                    </Card.Body>
                </Card>
                {ayatJuz.map((ayatitem, index)=>{
                    return(
                        <Card key={index} className="mt-1" border="primary" style={{marginBottom:"2rem"}}>
                            <Card.Header className="text-white bg-primary">
                                {ayatitem.verse_key}
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={12}>
                                        <p className="text-end fs-1">{ayatitem.text_uthmani}</p>
                                        {artiJuz.length? <p className="text-md-start fst-italic" dangerouslySetInnerHTML={{__html:artiJuz[index].text}} />:null}
                                        {audioJuz.length? <audio  className="h-10 mt-2   text-end float-end" src={"https://verses.quran.com/" + audioJuz[index].url} controls />:null}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })}
        </Container>
    );
}

export default Juzpage;