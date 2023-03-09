import {MdDeleteForever} from 'react-icons/md'

const Note = ({element,text,date,handleDeleteNote})=>{
    return(
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever onClick={()=>handleDeleteNote(element)} className='delete-icon' size='1.3em'/>
            </div>
        </div>
    );
}
export default Note;