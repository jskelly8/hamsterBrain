import React, { Component } from 'react';
import '../tasks.css'

class Tasks extends Component {
  constructor(props) {
    super(props);
    // Initial state includes the notes array (model) and input fields
    this.state = {
      notes: [],
      inputText: '',
      color: 'green',
      alert: ''
    };
  }

  // Handlers for input and button actions
  handleInputText = (e) => {
    this.setState({ inputText: e.target.value });
  }

  handleAddNote = (event) => {
    event.preventDefault();
    const { inputText, color, notes } = this.state;
    if (inputText !== '') {
      const newNote = {
        id: notes.length + 1,
        content: inputText,
        bgColor: color
      };
      this.setState({
        notes: [...notes, newNote],
        inputText: '', // Reset input field
        alert: 'Note Added!'
      });
      setTimeout(() => this.setState({ alert: '' }), 1000); // Hide alert after 1 sec
    }
  }

  handleDeleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id),
      alert: 'Note Deleted!'
    });
    setTimeout(() => this.setState({ alert: '' }), 1000); // Hide alert after 1 sec
  }

  // Methods for selecting note colors
  selectColor = (color) => {
    this.setState({ color });
  }

  render() {
    // color
    const { notes, inputText, alert } = this.state;

    return (
      <div className="margin">
        {/* Note input form */}
        <div className="panel panel-default">
          <div className="panel-body divCenter">
            <form className="form-group divCenter">
              <label className ="font35" htmlFor="note-add">Quick Notes:</label>
              <input
                id="note-add"
                className="form-control thicc"
                type="text"
                value={inputText}
                placeholder="For whatever you need to remember"
                onChange={this.handleInputText}
              />
              
              
              <button type="button" className="btn btn-success" onClick={this.handleAddNote}>Add Note</button>
            {alert && <span className="alerts">{alert}</span>}
              {/* <label>Select Color</label> */}
              <div>
                {/* Color selection options */}
                {/* {['green', 'red', 'blue', 'orange'].map((c) => (
                  <label key={c}>
                    <input
                      type="radio"
                      name="color"
                      checked={color === c}
                      onChange={() => this.selectColor(c)}
                    /> {c.charAt(0).toUpperCase() + c.slice(1)} &nbsp;
                  </label>
                  
                ))} */}
              </div>
            </form>
            <div className="button-container">
            {/* <button className="btn btn-success" onClick={this.handleAddNote}>Add Note</button>
            {alert && <span className="alerts">{alert}</span>} */}
          </div>
        </div>
        </div>

        {/* Notes display */}
        <h3 className="text-center divCenter">Notes</h3>
        <hr />




        <div className="divCenter container">
  {notes.length === 0 ? (
    <h3>No Notes</h3>
  ) : (
    notes.map(note => (
      <div key={note.id} className="d-flex align-items-center"> {/* Flex container */}
        <div className="col-md-1 text-center"> {/* Delete button container */}
          <button className="delete btn btn-default delete-btn-transform" onClick={() => this.handleDeleteNote(note.id)}>
            &times;
          </button>
        </div>
        <div className={`${note.bgColor} note-box alert col-md-11`} style={{ fontSize: '30px'}}>
          {note.content}
        </div>
      </div>
    ))
  )}
</div>
      </div>
    );
  }
}

export default Tasks;