import { useState } from 'react';
import { register } from '../api/register';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await register(email, password);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col items-center'>email</div>
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className='flex flex-col items-center'>password</div>
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Register</button>
      </form>
    </main>
  );
}