import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import NotefulContext from './NotefulContext'
import NoteError from './NoteError'
import DeleteError from './DeleteError'
import './MainMain.css'

export default class MainMain extends Component{
    static contextType = NotefulContext;
    render() {
        const value = this.context;
        const notes = value.notes.map((note, i) => 
            <NoteError>
              <section id='notes-main' key={i}>
                <Link 
                  to={`/notes/${note.id}`} 
                  id='note-link'
                  onClick={() => value.setNoteId(note.id)}
                >
                  {note.name}
                </Link>
                <span id='note-modified'>{new Date(note.modified).toLocaleString()}</span>
                <DeleteError>
                  <button 
                    id='delete-button'
                    onClick={e => value.deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </DeleteError>
              </section>
            </NoteError>
        )
        return(
            <div className='main-container'>
                { notes }
              <button 
                id='add-note-container'
                onClick ={() => value.history.push('/add-note')}>
                <Link 
                  to={'/add-note'}
                  id='add-note'
                >
                  Add Note
                </Link>
              </button>
            </div>
        )
    }
}