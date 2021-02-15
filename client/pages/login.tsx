import * as React from 'react';
import { useUserInfo } from '../api/auth';

export default function LoginPage() {
  const {
    login,
    user,
  } = useUserInfo();
  const [jwtInput, setJwtInput] = React.useState('');

  return (
    <div>
      <h1>Name: {user?.displayName}</h1>
      <input onChange={(e) => setJwtInput(e.target.value)} value={jwtInput} />
      <button onClick={() => login(jwtInput)}>Login</button>
    </div>
  )
}
