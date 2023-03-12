import NotesList from "../components/NotesList";
import {nanoid} from 'nanoid'
import { useContext, useEffect, useRef, useState } from 'react';
import Search from "../components/Search";
import { collection, addDoc ,doc,setDoc, updateDoc,arrayUnion,onSnapshot,getDoc,arrayRemove, Timestamp,query,where,getDocs} from "firebase/firestore";
import AuthContext from "../contexts/AuthContext";
import {db} from '../firebase';
import userEvent from "@testing-library/user-event";

export default function Home({children}){
const [darkMode, setDarkMode] = useState(false);
const [notes, setNotes] =useState([]);
const {currentUser } = useContext(AuthContext)
const userRef = doc(db, "users", currentUser.uid);

const getUsernotes = async()=>{
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    setNotes(docSnap.data().notes);
  } else {
    console.log("No such document!");
  }
}
const a= notes.length;
useEffect(()=>{
  getUsernotes();
},[]);

useEffect(()=>{
  getUsernotes();
},[nanoid]);

const addNote = async (text) => {
  const docSnap = await getDoc(userRef);
  const date = new Date();

  await updateDoc(doc(db, "users", currentUser.uid), {
    notes: arrayUnion({
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }),    
  })
  const updatedDocSnap = await getDoc(userRef);
  const updatedNotes = updatedDocSnap.data().notes;

  // set the local state to the updated notes
  setNotes(updatedNotes);

}
const deleteNote = async (id) => {
 // remove the note with the given id from the Firestore database
 await updateDoc(doc(db, "users", currentUser.uid), {
  notes: arrayRemove(notes.find(note => note.id === id)),
});

// remove the note with the given id from the local state
const updatedNotes = notes.filter(note => note.id !== id);
setNotes(updatedNotes);
};


const handleSearch= async (searchText)=>{
    const docSnap = await getDoc(userRef);
    const searchedNotes=(docSnap.data().notes).filter((note)=>note.text.toLowerCase().includes(searchText));
    setNotes(searchedNotes);
    
}

  return(
     <div>
      <div className="container">
      <Search handleSearchNote={handleSearch}/>
      <NotesList 
      notes={notes}
      handleAddNote ={addNote}
      handleDeleteNote= {deleteNote}
      />
     </div>
     </div>
    )
}

