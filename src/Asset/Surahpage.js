import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";


const Homepage=()=> {
    const [surah, setSurah] = useState([])

    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters?language=id")
            .then((res) => {
                setSurah(res.data.chapter)
            })
            .catch((error) => {
                console.log(error, "Page Not Found")
            })
        }, []
    );

    return (
        <Container fluid>
            <div className="mt-3 ">
                <h1 className="fs-1 text-success ">Daftar Surah:</h1>
            </div>
            <div className="card-group " style={{margin:"auto"}} >
                {surah.map((surahitem, index)=>(
                    <div className=" row-1" key={index} style={{marginLeft:"7px"}}>
                        <div className="col-md-6 mb-4">
                            <center>
                                <div  className="card border-success mb-3" style={{width:"15rem", height:"17rem"}}>
                                    <div className="card-body">
                                        <span className="badge bg-success">{surahitem.id}</span>
                                        <h5 className="card-title">{surahitem.name_simple} {surahitem.name_arabic}</h5>
                                        <p className="card-text text-start"><strong>Arti :</strong> {surahitem.translated_name.name} </p>
                                        <p className="card-text text-start"><strong>Jumlah Ayat :</strong> {surahitem.verses_count} </p>
                                        <p className="card-text text-start"><strong>Tempat Turun :</strong> {surahitem.revelation_place} </p>
                                        <Link  className="btn btn-outline-success" to={"/surah/" + surahitem.id}>Read Surah</Link>
                                    </div>
                                </div>
                            </center>
                        </div>
                        <br/>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Homepage;