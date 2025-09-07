import React from 'react';
import Login from '../components/Auth/Login';

export default function LoginPage({ onAuth }) {
  return <Login onAuth={onAuth} />;
}
