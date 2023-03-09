import { useState  } from "react";

const AddNote = ({handleAddNote})=>{
    const charLimit  = 200;
    const [noteText,setNoteText] = useState('');

    const handleChange=(event)=>{
        if(charLimit-event.target.value.length>=0)
        setNoteText(event.target.value);
    };

    const handleSaveClick=()=>{
        if (noteText.trim().length >0) {
            handleAddNote(noteText);
            setNoteText('');
        }
       
    }

    return (
        <div className="note new">
            <textarea
            rows='8'
            cols='10'
            value={noteText}
            placeholder='Type Your Note'
            onChange={handleChange}
            >
            </textarea>
            <div className="note-footer">
                    <small>{charLimit-noteText.length} remaining</small>
                    <button onClick={handleSaveClick} className="save">Save</button>
            </div>
        </div>
    );
}

export default AddNote;