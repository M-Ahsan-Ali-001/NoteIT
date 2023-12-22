import React, { useEffect, useState, Suspense } from "react";
import "../styles.css";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const NoteCard = ({ title, tag }) => {
    return (
        <div className="note-card">
            <h2>{title}</h2>
            <h2>{tag}</h2>
            {/* Add other content of the note card */}
        </div>
    );
};

export default function HomePage({ setPage }) {
    const [cookies, setCookie] = useCookies(['emailer']);
    const [array, setArray] = useState([]);
    const [data, setData] = useState("");

    useEffect(() => {
        // Use an arrow function to define Call function
        const Call = async () => {
            try {
                const res = await axios.post("http://localhost:8888/.netlify/functions/display_notes", {
                    email: cookies.email
                });
                console.log(res);
                setArray(res.data);
                console.log("a", array);
            } catch (err) {
                alert(err);
            }
        };

        // Call the function when the component mounts
        Call();
    }, []); // Empty dependency array ensures this effect runs once on mount

    const funcLogout = () => {
        setCookie('email', "/");
        setCookie('pass', "/");
        setPage("a");
    };

    const funcHandleDta=(dt)=>{

        setData("d")
    }

    return (
        <div id="home-container">
            <div id="all-notes">
                <h1>Inbox</h1>
                <hr id="separator-horizontal" />
                {/* Render NoteCards based on the data received from the API */}
                {array.map((element, index) => (
                 
                    <div    onClick={()=>{
                        setData(array[index].data)
                    }}>
                    <NoteCard key={index} title={element.title} tag={element.tag} />
                     </div>
                ))}
            </div>
            <button id="button-logout" onClick={funcLogout}> logout</button>



            <div id="separator-vertical"></div>
            <div id="selected-note">
                <div className="inline">
                    <h1>Note Title</h1>
                    <button id="button-logout" onClick={funcLogout}> logout</button>
                </div>
                <hr id="separator-horizontal" />
                <h2>{data}</h2>
            </div>
        </div>
    );
}
