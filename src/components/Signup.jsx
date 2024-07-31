import React, { useContext, useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Firestore';
import { useNavigate } from 'react-router-dom';
import { game } from './Globalstate';
import { useAuthState } from 'react-firebase-hooks/auth';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user1, setuser1 } = useContext(game);
  const navigate = useNavigate();
  const [log, setLog] = useState(true);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setuser1(true);
      navigate('/todo');
    } else {
      navigate('/');
      
    }
  }, [user, loading, navigate, setuser1]);

  const handleSignup = () => {
    if (email && username && password && confirmPassword) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((snap) => {
          
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const handleSignin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((snap) => {
          
          setLog(false);
          setEmail('');
          setPassword('');
          setuser1(true);
          navigate('/todo');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
       
        setuser1(true);
        navigate('/todo');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
    <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-6 md:p-8 lg:p-10">
      {log ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Signup</h1>
          <Input text={'text'} name={'username'} placeholder={'Username'} value={username} setvalue={setUsername} />
          <Input text={'email'} name={'email'} placeholder={'Email'} value={email} setvalue={setEmail} />
          <Input text={'password'} name={'password'} placeholder={'Password'} value={password} setvalue={setPassword} />
          <Input text={'password'} name={'confirmpassword'} placeholder={'Confirm Password'} value={confirmPassword} setvalue={setConfirmPassword} />
          <Button onclick={handleSignup} text={'Signup'} />
          <h1 className="text-gray-600">Already have an account? <button className="text-blue-400" onClick={() => setLog(!log)}>Login</button></h1>
          <h1 className="text-gray-600">or</h1>
          <Button onclick={handleGoogleSignIn} text={'Sign in with Google'} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <Input text={'email'} name={'email'} placeholder={'Email'} value={email} setvalue={setEmail} />
          <Input text={'password'} name={'password'} placeholder={'Password'} value={password} setvalue={setPassword} />
          <Button onclick={handleSignin} text={'Log In'} />
          <h1 className="text-gray-600">Don't have an account? <button className="text-blue-400" onClick={() => setLog(!log)}>Sign Up</button></h1>
          <h1 className="text-gray-600">or</h1>
          <Button onclick={handleGoogleSignIn} text={'Sign in with Google'} />
        </div>
      )}
    </div>
  </div>
);
}

export default Signup;