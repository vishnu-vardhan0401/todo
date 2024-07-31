import React, { useContext, useEffect, useState } from 'react';
import { addDoc, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, colref, db } from '../Firestore';
import Button from './Button';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import { game } from './Globalstate';



function Todo() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  let {user1,setuser1}=useContext(game)
 

  useEffect(() => {
    if (!loading) {
      if (user1) {
        navigate('/todo');
        retrieveTodos();
      } else {
        navigate('/');
      }
    }
      } 
  , [user1,loading,navigate]);

  const handleAdd = async () => {
    if (title === '') {
     
      return;
    }

    try {
      await addDoc(colref, {
        title: title,
        date: new Date().toISOString(),
      });
      setTitle('');
      retrieveTodos();
      setEdit(false);
      
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const docRef = doc(db, 'books', id);
      await deleteDoc(docRef);
      retrieveTodos();
      
    } catch (e) {
     console.log(e.message);
    }
  };

  const retrieveTodos = async () => {
    try {
      const snap = await getDocs(colref);
      const todos = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodos(todos);
    } catch (e) {
     console.log(e)
    }
  };

  const handleEdit = async (id) => {
    try {
      const docRef = doc(db, 'books', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (title === '') {
          setEdit(true);
          setTitle(docSnap.data().title);
          deleteTodo(id)
        } else {
          setEdit(false);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  function handleSignout(){
    try{
      signOut(auth)
      .then(()=>{
        navigate('/')
      })
    }
    catch(e){
      console.log(e.message)
    }
    }

  return (
    <div className='w-[100%] border-2 border-black  flex flex-col gap-2 items-center  mt-4 h-full'>
      <h1>Todo</h1>
      <div className='flex  gap-5 w-[100vw] items-center justify-center  '>
        <input
          className='border-2 border-black w-52'
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className='border-2 border-black' onClick={handleAdd}>
          Add
        </button>
      </div>
      {todos.map((item) => (
        <div className='flex gap-2 my-2' key={item.id}>
          <h1 className='border-2 border-black break-words w-52 p-1'>{item.title}</h1>
          <button
            className='border-2 border-black p-1'
            disabled={edit}
            onClick={() => handleEdit(item.id)}
          >
            Edit
          </button>
          <button
            className='border-2 border-black p-1'
            disabled={edit}
            onClick={() => deleteTodo(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <Button text='Sign out' onclick={handleSignout} />
    </div>
  );
}

export default Todo;
