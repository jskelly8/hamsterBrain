import { useState } from 'react';
import '../tasks.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBan } from '@fortawesome/free-solid-svg-icons';
import { ADD_TASK } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker'
import 'react-datepicker/dist/react-datepicker.css';

const Tasks = () => {
  const [inputText, setInputText] = useState('');
  const [addTask, {error}] = useMutation(ADD_TASK);
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);

const handleTaskTextChange = (event) => {
  setInputText(event.target.value);
};

const handleAddTask = async() => {
  if (!inputText) return;

  try {
    await addTask({
      variables: {
        task: inputText,
        dueDate: dueDate,
        dueTime: dueTime,
      }
    });
    setInputText('');
    setDueDate(null);
    setDueTime(null);
  } catch (error) {
    console.log(error);
  }

};

return (
<div>
      <h2>Add Task</h2>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={inputText}
          onChange={handleTaskTextChange}
        />
      </div>
      <div>
        <DatePicker
          selected={dueDate}
          onChange={date => setDueDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select due date"
        />
      </div>
      <div>
        <TimePicker
          value={dueTime}
          onChange={time => setDueTime(time)}
          clearIcon={null} // To hide the clear icon
          disableClock={true} // Disable clock for time selection
        />
      </div>
      <button onClick={handleAddTask}>Add Task</button>
      {error && <p>Error adding task. Please try again.</p>}
    </div>
  );
};

export default Tasks;