import React, { useEffect, useState, Suspense } from "react";
import "../styles.css";
import { useCookies } from "react-cookie";
import axios from "axios";

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
  const [cookies, setCookie] = useCookies(["emailer"]);
  const [array, setArray] = useState([]);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("Note Title");
  const formDiv = document.getElementsByClassName("create-form");

  const outerFormDiv = document.getElementById("home-container");
  const tag = document.getElementsByClassName("tag");
  const dataa = document.getElementsByClassName("data");
  const [formselect, setForm] = useState("a");
  const [id, setID] = useState("");

  useEffect(() => {
    // Use an arrow function to define Call function
    const Call = async () => {
      try {
        const res = await axios.post(
          "https://noteitnotes.netlify.app/.netlify/functions/display_notes",
          {
            email: cookies.email,
          }
        );
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
    setCookie("email", "/");
    setCookie("pass", "/");
    setPage("a");
  };

  const funcHandleDta = (dt) => {
    setData("d");
  };

  const closeCreateMenu = () => {
    formDiv[0].style.visibility = "hidden";
    outerFormDiv.style.pointerEvents = "all";
    outerFormDiv.style.opacity = "100%";
  };

  const openCreateMenu = (e) => {
    formDiv[0].style.visibility = "visible";
    outerFormDiv.style.pointerEvents = "none";
    outerFormDiv.style.opacity = "10%";
  };

  const openUpdateMenu = () => {
  
    formDiv[1].style.visibility = "visible";
    formDiv[1].style.opacity = "100%";
    outerFormDiv.style.pointerEvents = "none";
    outerFormDiv.style.opacity = "10%";
    tag[1].value = title
    dataa[1].value=data
  };

  const openDeleteMenu = () => {
    formDiv[2].style.visibility = "visible";
    formDiv[2].style.opacity = "100%";
    outerFormDiv.style.pointerEvents = "none";
    outerFormDiv.style.opacity = "10%";
  };

  const closeupdateMenu = () => {
    

    formDiv[1].style.visibility = "hidden";
    outerFormDiv.style.pointerEvents = "all";
    outerFormDiv.style.opacity = "100%";


  };

  const closeDeleteMenu = () => {
    formDiv[2].style.visibility = "hidden";
    outerFormDiv.style.pointerEvents = "all";
    outerFormDiv.style.opacity = "100%";
  };
const refresNotes = async( )=>{

    try {
        const res = await axios.post(
          "https://noteitnotes.netlify.app/.netlify/functions/display_notes",
          {
            email: cookies.email,
          }
        );
        setArray([...res.data]); // Use spread operator to create a new array reference
        closeCreateMenu()
      } catch (err) {
        alert(err);
      }
}
  const createNewNote =  async() => {
    if (dataa[0].value === "" || tag[0].value === "" || cookies.email === "") {
      alert("error!");
    } else {
      try {
        await axios.post(
          "https://noteitnotes.netlify.app/.netlify/functions/user_notes_create",
          {
            email: cookies.email,
            tag: tag[0].value,
            data: dataa[0].value,
          }
        );
  
        // Fetch and update the array after creating a new note
        refresNotes ()
      } catch (err) {
        alert(err);
      }
    }
  };
  const deleteNot = async()=>{

    try {
        await axios.post(
          "https://noteitnotes.netlify.app/.netlify/functions/delete_note",
          {
            note_id:id
          }
        );
  
        // Fetch and update the array after creating a new note
        refresNotes ()
        closeDeleteMenu()
      } catch (err) {
        alert(err);
      }
  }



  const updateNewNote =  async() => {
    if (dataa[1].value === "" || tag[1].value === "" || cookies.email === "") {
      alert("error!");
    } else {
      try {
        await axios.post(
          "https://noteitnotes.netlify.app/.netlify/functions/update_note",
          {
            note_id:id,
            tag: tag[1].value,
            data: dataa[1].value,
          }
        );
  
        // Fetch and update the array after creating a new note
        refresNotes ()
        closeupdateMenu()
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div>
      <div className="create-form">
        <h1> Create New Note </h1>

        <input class="tag" placeholder="Tag name" />
        <textarea
          rows={30}
          cols={35}
          class="data"
          placeholder="enter note data here ....."
        />

        <button id="button-logout" onClick={createNewNote}>
          Create
        </button>
        <button id="button-logout" onClick={closeCreateMenu}>
          Close
        </button>
        <br></br>
        <br></br>
      </div>

      <div className="create-form">
        <h1> Update {title} </h1>

        <input class="tag" placeholder="Tag name" />
        <textarea
          rows={30}
          cols={35}
          class="data"
          placeholder="enter note data here ....."
        />

        <button id="button-logout" onClick={updateNewNote}>
          update
        </button>
        <button id="button-logout" onClick={closeupdateMenu}>
          Close
        </button>
        <br></br>
        <br></br>
      </div>

      <div className="create-form">
        <h1> Are You Sure you want delete {title}! </h1>

        <div className="div-del">
          <button id="del-but" onClick={deleteNot}>Delete</button>

          <button id="cancle-but" onClick={closeDeleteMenu}>
            Cancel
          </button>
        </div>
        <br></br>
        <br></br>
      </div>

      <div id="home-container">
      <div id="left-spacer">

          <div id="all-notes">
          <h1>Inbox</h1>
          <hr id="separator-horizontal" />
          {/* Render NoteCards based on the data received from the API */}
          {array.map((element, index) => (
            <div
              className="note-holder"
              onClick={() => {
                setData(array[index].data);
                setTitle(array[index].tag);
                setID(array[index]._id)
            
                const holder = document.getElementsByClassName("note-holder");

                for (let x = 0; x < array.length; x++) {
                  if (x == index) {
                    holder[index].style.border = "1px solid greenyellow";
                  } else {
                    holder[x].style.border = "none";
                  }
                }
              }}
            >
              <NoteCard key={index} title={element.title} tag={element.tag} />
            </div>
          ))}

          {/* <div className="buttonsCRUD">
            <button id="button-logout" value="a" onClick={openCreateMenu}>
              Create
            </button>
            <div className="space"></div>
            <button id="button-logout" onClick={openDeleteMenu}>
              Delete
            </button>
            <div className="space"></div>
            <button id="button-logout" onClick={openUpdateMenu}>
              Update
            </button>
          </div> */}
        </div>
        <div className="buttonsCRUD">
            <button id="button-logout" value="a" onClick={openCreateMenu}>
              Create
            </button>
            <div className="space"></div>
            <button id="button-logout" onClick={openDeleteMenu}>
              Delete
            </button>
            <div className="space"></div>
            <button id="button-logout" onClick={openUpdateMenu}>
              Update
            </button>
          </div>
      </div>

        <div id="separator-vertical"></div>

        <div id="selected-note">
          <div className="inline">
            <h1>{title}</h1>
            <button id="button-logout" onClick={funcLogout}>
              Logout
            </button>
          </div>
          <hr id="separator-horizontal" />
          <h2>{data}</h2>
        </div>
      </div>
    </div>
  );
}
