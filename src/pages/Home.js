import NotesList from "../components/NotesList";
import {nanoid} from 'nanoid'

import { useContext, useEffect, useRef, useState } from 'react';
import Search from "../components/Search";
import { collection, addDoc ,doc,setDoc, updateDoc,arrayUnion,onSnapshot,getDoc,arrayRemove, Timestamp,query,where,getDocs} from "firebase/firestore";
import AuthContext from "../contexts/AuthContext";
import {db} from '../firebase';
import userEvent from "@testing-library/user-event";
export default function Home({children}){
const [searchText,setSearchText] = useState('');
const [darkMode, setDarkMode] = useState(false);
const [notes, setNotes] =useState([]);
const {currentUser } = useContext(AuthContext)
const userRef = doc(db, "users", currentUser.uid);

useEffect(()=>{
  const getUsernotes = async()=>{
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    setNotes(docSnap.data().notes);
  } else {
    console.log("No such document!");
  }
}
getUsernotes();
},[]);


useEffect(()=>{
  const getUsernotes = async()=>{
  const docSnap = await getDoc(userRef,);
  if (docSnap.exists()) {
    setNotes(docSnap.data().notes);
  } else {
    console.log("No such document!");
  }
}
getUsernotes();
},[notes]);


const addNote = async (text) => {
  await updateDoc(doc(db, "users", currentUser.uid), {
      notes : arrayUnion(text),
  });
}

const deleteNote = async (id) => {
  await updateDoc(doc(db, "users", currentUser.uid), {
    notes : arrayRemove("dude"),
});
console.log("clicked")
}

const handleSearch= async ()=>{
  const q = query(collection(db, "users"), where("notes", "==", searchText));
try{
  const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
console.log("hey");
});}catch(error){
  console.log("error")
}

}
  return(
  
     <div>
      <div className="container">
      <Search handleSearchNote={setSearchText}/>
      <NotesList 
      notes={notes}
      handleAddNote ={addNote}
      handleDeleteNote= {deleteNote}
      />
     </div>
     </div>
    )
}

