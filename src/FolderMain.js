import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import './FolderMain.css'

export default class FolderMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;
    render() {
        const value = this.context;
        const folderId = value.folderId;
        const notes = value.notes;
        const notesInFolder = notes.map((note, i) => 
            note.folderid === folderId ? 
            <section className='folders-main' key={i}>
              <Link 
                  to={`/notes/${note.id}`} 
                  id='note-link'
                  onClick={() => {
                    value.setNoteId(note.id);
                    value.setFolderId(note.folderId);
                  }}
                >
                  {note.name}
                </Link>
                <span 
                  className='note-modified'>{new Date(note.modified).toLocaleString()}
                </span>
                  <button 
                    id='delete-button'
                    onClick={e => value.deleteNote(note.id)}
                  >
                    Delete
                  </button>
            </section> : '');
        return(
          <section className='main-container'>
              {notesInFolder}
              <button 
                id='add-note-container'
                onClick ={() => value.history.push('/add-note')}>
                  Add Note
              </button>
          </section>
        )
    }
}