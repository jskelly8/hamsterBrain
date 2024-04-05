import { useState } from 'react';
// import '../tasks.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBan } from '@fortawesome/free-solid-svg-icons';
import { ADD_TASK } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { QUERY_TASKS } from '../utils/queries';

const Tasks = () => {
  const [inputText, setInputText] = useState('');
  const [addTask, { error }] = useMutation(ADD_TASK);
  const [dueDate, setDueDate] = useState(null);
  const [dueTime, setDueTime] = useState(null);
  const { data, loading, error: queryError } = useQuery(QUERY_TASKS);

  const handleTaskTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTask = async () => {
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
    <div className='taskContainer'>
      <h2 className='addTaskTitle'>Add Task</h2>
      <div className='addTaskSection'>
        <div className='addTaskInputs btn'>
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
              showTimeSelect
              placeholderText="Select due date"
            />
          </div>
          <button onClick={handleAddTask}>Add Task</button>
          {error && <p>Error adding task. Please try again.</p>}
        </div>
      </div>
      <h2 className='taskListTitle'>Task List</h2>
      <div className='taskList'>
        {loading ? <p>Loading tasks...</p> : queryError ? <p>Error loading tasks!</p> : (
          <ul>
            {data.tasks.map(task => (
              <li key={task._id}>{task.task} - Due: {task.dueDate || 'No due date'}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tasks;