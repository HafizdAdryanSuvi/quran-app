import React, { useEffect, useState} from "react";
import {Accordion, Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const Surahpage=()=> {
    const {id} = useParams();
    const [namaSurah, setNamaSurah] = useState([]);
    const [ayah, setayah]= useState([]);
    const [arti, setArti]=useState([]);
    const [audioayah, setAudioayah]= useState([]);
    const [audioSurah, setAudioSurah]=useState([]);
    const [info, setInfo]=useState([]);
    const [surah, setSurah]= useState([])

    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters/" + id)
            .then((res) => {
                setNamaSurah(res.data.chapter)
                // console.log(res.data.chapter)
            })
            .catch((error) => {
                console.log(error, "error handle nama surah")
            })
        axios.get("https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=" + id)
            .then((res)=>{
                setayah(res.data.verses)
            })
            .catch((error)=>{
                console.log(error, "error handle ayah surah")
            })
        axios.get("https://api.quran.com/api/v4/quran/translations/134?chapter_number=" +id)
            .then((res)=>{
                setArti(res.data.translations)
            })
            .catch((error)=>{
                console.log(error, "error handle arti surah")
            })
        axios.get("https://api.quran.com/api/v4/quran/recitations/7?chapter_number=" +id)
            .then((res)=>{
                setAudioayah(res.data.audio_files)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayah")
            })
        axios.get("https://api.quran.com/api/v4/chapter_recitations/7/" +id)
            .then((res)=>{
                setAudioSurah(res.data.audio_file)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayah")
            })
        axios.get("https://api.quran.com/api/v4/chapters/" + id + "/info?language=id")
            .then((res)=>{
                setInfo(res.data.chapter_info)
            })
            .catch((error)=>{
                console.log(error, "error handle info")
            })
        axios.get("https://api.quran.com/api/v4/chapters/" + id)
            .then((res)=>{
                setSurah(res.data.chapter)
            })
            .catch((error)=>{
                console.log(error, "error handle surah")
            })
    },[id])
    return (
        <Container>
                <Card border="light">
                    <Card.Body>
                        <div className=" row justify-content-center align-items-center text-xxl">
                            <Card.Title className="text-primary" >
                                <h1>Surah {namaSurah.name_simple}</h1>
                            </Card.Title>
                            <audio src={audioSurah.audio_url} controls />
                            <Accordion style={{marginTop:"1rem"}}>
                                <Accordion.Header>
                                    About Surah
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p dangerouslySetInnerHTML={{__html: info.short_text}}/>
                                    <Link to={"/info/"+ surah.id}>
                                        <Button>
                                            Read More
                                        </Button>
                                    </Link>
                                </Accordion.Body>
                            </Accordion>
                        </div>
                    </Card.Body>
                </Card>
                {ayah.map((ayahitem, index)=>{
                    return(
                        <Card key={index} className="mt-1" border="primary" style={{marginBottom:"2rem"}}>
                            <Card.Header className="text-white bg-primary">
                                {ayahitem.verse_key}
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={12}>
                                        <p className="text-end fs-1">{ayahitem.text_uthmani}</p>
                                        {arti.length? <p className="text-md-start fst-italic" dangerouslySetInnerHTML={{__html:arti[index].text}} />:null}
                                        {audioayah.length? <audio  className="h-10 mt-2   text-end float-end" src={"https://verses.quran.com/" + audioayah[index].url} controls color="primary" />:null}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })}
        </Container>
    );

}

export default Surahpage;