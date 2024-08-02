import React, { useContext, useEffect, useState } from 'react';
import { addDoc, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, colref, db } from '../Firestore';
import Button from './Button';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
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
      toast.error('Title cannot be empty');
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
      toast.success('Todo added successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const docRef = doc(db, 'books', id);
      await deleteDoc(docRef);
      retrieveTodos();
      toast.success('Todo deleted successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const retrieveTodos = async () => {
    try {
      const snap = await getDocs(colref);
      const todos = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodos(todos);
    } catch (e) {
      toast.error(e.message);
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
      toast.error(e.message);
    }
  };

  function handleSignout(){
    try{
      signOut(auth)
      .then(()=>{
        navigate('/')
        toast.success("signed out successfully")
      })
    }
    catch(e){
      toast.error(e.message)
    }
    }

  return (
    <div className=' w-[90%] ml-6 px-4 md:w-[80%] lg:w-[80%] bg-gray-100 flex flex-col  gap-2 items-center  lg:mt-10 lg:ml-36 md:mt-10 md:ml-20 h-full shadow-2xl rounded-3xl pb-5'>
      <h1 className=' text-blue-500 text-3xl'>MY Todo-s</h1>
      <div className='flex  gap-5 w-[100vw] items-center justify-center'>
        <input
          className='border-2 p-1.5 w-64 md:min-w-[470px] lg:min-w-[500px]'
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className=' p-2 px-6 rounded-xl bg-blue-400 text-white' onClick={handleAdd}>
          Add
        </button>
      </div>
      {todos.map((item) => (
        <div className='flex gap-2 my-2' key={item.id}>
          <h1 className=' break-words w-52 p-1 pl-4 '>{item.title}</h1>
          <button
            className=' border-2 px-4 py-2'
            disabled={edit}
            onClick={() => handleEdit(item.id)}
          >
            Edit
          </button>
          <button
            className=' border-2 px-4'
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
