import React, { Component } from 'react'
import NotefulContext from './NotefulContext'
import './AddNote.css'

export default class AddNote extends Component {
    static contextType = NotefulContext;

    render() {
        const value = this.context;
        return(
          <form id='form-container'>
              <h2>Add new note</h2>
              <div id='form-group'>
                  <label htmlFor='note-name'>Note name</label><br/>
                  <input 
                    type='text'
                    name='note-name'
                    id='note-name'
                    required='required'
                  />
                  <br/>
                  <label htmlFor='select-folder'>Select a folder</label><br/>
                  <select 
                    type='radio'
                    name='select-folder'
                    id='select-folder'
                    required='required'
                  >
                      {
                          value.folders.map((folder, i) => {
                            return(
                              <option 
                                key={i}
                                value={folder.id}
                              >
                                  {folder.name}
                              </option>
                            )
                          })
                      }
                  </select><br/>
                  <label htmlFor='note-body'>Type note here</label><br/>
                  <textarea id='note-body'></textarea>
                  <br/>
                  <button 
                    id='note-submit'
                    type='submit'
                    onClick={event => {
                        console.log('submit button clicked');
                        return value.addNote(event, document.getElementById('note-name').value, document.getElementById('note-body').value, document.getElementById('select-folder').value)}
                    }
                  >
                      Submit
                  </button>
                  <button 
                    id='note-clear'
                    onClick={event => value.handleClearButton(event)}>Clear</button>
              </div>
          </form>
        )
    }
}