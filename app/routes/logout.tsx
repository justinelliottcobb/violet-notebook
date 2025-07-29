import { useEffect } from 'react';
import { logout } from '~/services/auth.client';

export default function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}