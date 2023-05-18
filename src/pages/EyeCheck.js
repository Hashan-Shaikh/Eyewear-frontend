import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './EyeCheck.css'
import NavBar from '../UI/NavBar'

const EyeCheck = () => {
    const [category, setCategory] = useState('')
    const [score, setScore] = useState('')
    const history = useNavigate()
    const uploadFile = async (e) => {
        const file = e.target.files[0]
        if (file != null) {
            const data = new FormData()
            data.append('file', file)

            try {
                const res = await axios.post('http://127.0.0.1:5000/api/model', data, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                }, {
                    withCredentials: true
                });
                const r = res.data;
                setCategory(r.class)
                setScore(r.score)
                //history('/home');
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <>
            <NavBar />
            <h2 className="highlighted-heading">Deep Learning Model For Cataract Detection</h2>
            <p className="description">Please upload your fundus image</p>
            <form className='fm'>
                <label className='lb' for="fileInput">
                    <div className='label2'>Upload File</div>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={uploadFile}
                    >
                    </input>
                </label>
            </form>
            <div className="category">Class: {category}</div>
            <div className="score">Score: {score}</div>
        </>

    )
}

export default EyeCheck
