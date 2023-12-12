import React, { useEffect, useState } from "react";
import "../styles.css"

const NoteCard = ({ title }) => {
    return (
        <div className="note-card">
            <h2>{title}</h2>
            {/* Add other content of the note card */}
        </div>
    );
};




export default function HomePage() {
    return (
        <div id="home-container">

            <div id="all-notes">
                <h1>Inbox</h1>
                <hr id="separator-horizontal" />

                <div id="note-cards">
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                </div>

            </div>
            <div id="separator-vertical"></div>
            <div id="selected-note">
                {/* TODO: Show Title of Selected Note Here  */}
                <h1>Note Title</h1>
                <hr id="separator-horizontal" />
            </div>
        </div>
    );
}