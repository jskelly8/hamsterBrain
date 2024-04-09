import { useState } from 'react';
import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { QUERY_PARTNER_TASKS } from '../utils/queries';

const Tasks = () => {
  const [inputText, setInputText] = useState('');
  const [editText, setEditText] = useState('');
  const [dueDateTime, setDueDateTime] = useState(null);
  const [editDueDateTime, setEditDueDateTime] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [addTask, { error: addError }] = useMutation(ADD_TASK);
  const [updateTask, { error: updateError }] = useMutation(UPDATE_TASK);
  const [deleteTask, { error: deleteError }] = useMutation(DELETE_TASK);
  const { data, loading, error: queryError, refetch } = useQuery(QUERY_PARTNER_TASKS);

  const handleTaskTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTask = async () => {
    if (!inputText) return;
    try {
      await addTask({
        variables: {
          task: inputText,
          dueDate: dueDateTime ? dueDateTime.toISOString().split('T')[0] : null,
          dueTime: dueDateTime ? `${dueDateTime.getHours()}:${dueDateTime.getMinutes()}` : null,
        }
      });
      setInputText('');
      setDueDateTime(null);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask({
        variables: { taskId }
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(task._id);
    setEditText(task.task);

    const editDate = new Date(parseInt(task.dueDate, 10));
    if (!isNaN(editDate.valueOf())) {
      setEditDueDateTime(editDate);
    } else {
      setEditDueDateTime(new Date());
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask({
        variables: {
          taskId: isEditing,
          task: editText,
          dueDate: editDueDateTime ? editDueDateTime.toISOString() : null,
        }
      });
      setIsEditing(null);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (data) {
    console.log("Task data fetched:", data.tasks);
    data.tasks.forEach(task => {
      console.log(`Raw date for task ${task._id}:`, task.dueDate);
    });
  }

  const handleCompleteTask = async (taskId, completed) => {
    try {
      // Call updateTask mutation with completion status
      await updateTask({
        variables: {
          taskId,
          completed,
        }
      });
      refetch(); 
    } catch (error) {
      console.error(error);
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
              selected={dueDateTime}
              onChange={setDueDateTime}
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeSelect
              timeFormat="HH:mm"
              placeholderText="Select due date and time"
            />
          </div>
          <button onClick={handleAddTask}>Add Task</button>
          {addError && <p>Error adding task. Please try again.</p>}
        </div>
      </div>
      <h2 className='taskListTitle'>Task List</h2>
      <div className='taskList'>
        {loading ? <p>Loading tasks...</p> : queryError ? <p>Error loading tasks!</p> : (
          <ul>
            {data && data.tasks.map(task => (
              <li key={task._id}>
                {isEditing === task._id ? (
                  <>
                    {/* Edit mode inputs and buttons */}
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <DatePicker
                      selected={editDueDateTime}
                      onChange={setEditDueDateTime}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      showTimeSelect
                      timeFormat="HH:mm"
                    />
                    <div className='taskBtn btn'>
                      <button onClick={handleUpdateTask}>Save</button>
                      <button onClick={() => setIsEditing(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {task.task} - Due: {new Date(parseInt(task.dueDate, 10)).toLocaleString()}
                    <div className='taskBtn btn'>
                      <button onClick={() => handleEditTask(task)}>Edit</button>
                      <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                      <button onClick={() => handleCompleteTask(task._id, !task.completed)}>Complete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        {updateError && <p>Error updating task. Please try again.</p>}
      </div>
    </div>
  );
};

export default Tasks;