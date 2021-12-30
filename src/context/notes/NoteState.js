import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialNote = [];
  const [notes, setNotes] = useState(initialNote);

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNGZiMWU3ZDk0MWJiZjIzYWIwNTQ3In0sImlhdCI6MTYzOTI5NDY3OH0.E2vAMCrtbGn8lzWvUhGF_l3Ce8cg8CYCFyfdJlahN1A",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));    
  };

  //get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNGZiMWU3ZDk0MWJiZjIzYWIwNTQ3In0sImlhdCI6MTYzOTI5NDY3OH0.E2vAMCrtbGn8lzWvUhGF_l3Ce8cg8CYCFyfdJlahN1A",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNGZiMWU3ZDk0MWJiZjIzYWIwNTQ3In0sImlhdCI6MTYzOTI5NDY3OH0.E2vAMCrtbGn8lzWvUhGF_l3Ce8cg8CYCFyfdJlahN1A",
      } 
    });
    const json = response.json();


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNGZiMWU3ZDk0MWJiZjIzYWIwNTQ3In0sImlhdCI6MTYzOTI5NDY3OH0.E2vAMCrtbGn8lzWvUhGF_l3Ce8cg8CYCFyfdJlahN1A",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
  

    let newNotes = JSON.parse(JSON.stringify(notes))

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
