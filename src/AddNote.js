import React, { Component } from 'react'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import ValidateEmptyField from './ValidateEmptyField'
import './AddNote.css'

export default class AddNote extends Component {
    static contextType = NotefulContext;

    validateNameInput = () => {
      const name = this.context.noteName.value.trim();
      if ( name.length === 0) {
        return 'Name is required'
      } else if (name.length <= 2) {
        return 'Note name must be at least three characters'
      }
    };
  
    validateNoteInput = () => {
      const body = this.context.noteBody.value.trim();
      if (body.length === 0) {
        return 'Enter valid message'
      } else if ( body.length > 3000) {
        return 'Maximum characters is 3000'
      }
    };

    validateEmptyName = () => {
      if (this.context.noteName.touched === false) {
        return 'Please enter name here'
      }
    };

    validateEmptyNote = () => {
      if (this.context.noteBody.touched === false) {
        return 'Please enter note here'
      }
    }

    render() {
        const value = this.context;
        const nameError = this.validateNameInput();
        const bodyError = this.validateNoteInput();
        return(
          <form id='form-container'>
              <h2>Add new note</h2>
              <section id='form-group'>
                  <label htmlFor='note-name'>Note name</label><br/>
                  <input 
                    type='text'
                    name='note-name'
                    id='note-name'
                    required='required'
                    aria-required='true'
                    onChange={event => value.handleNameChange(event.target.value)}
                  />
                  {value.noteName.touched && <ValidationError message={nameError} />}
                  {<ValidateEmptyField message={this.validateEmptyName()} />}
                <br/>
                  <label htmlFor='select-folder'>Select a folder</label><br/>
                  <select 
                    type='radio'
                    name='select-folder'
                    id='select-folder'
                    required={true}
                    aria-required='true'
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
                  <label htmlFor='type-note-here'>Type note here</label><br/>
                  <textarea 
                    id='type-note-here'
                    required={true}
                    aria-required='true'
                    onChange={event => value.handleNoteChange(event.target.value)}
                  >
                  </textarea>
                  {value.noteBody.touched && <ValidationError message={bodyError} />}
                  {<ValidateEmptyField message={this.validateEmptyNote()} />}
                  <br/>
                  <button 
                    id='note-submit'
                    type='submit'
                    disabled = {
                      nameError ||
                      bodyError
                    }
                    onClick={event => {
                        return value.addNote(event, document.getElementById('select-folder').value)}
                    }
                  >
                      Submit
                  </button>
                  <button 
                    id='note-clear'
                    type='reset'
                    onClick={event => value.handleClearButton(event)}
                    >
                      Clear
                    </button>
              </section>
          </form>
        )
    }
};