import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage'
import { AuthCallbackPage }  from './pages/authcallback/AuthCallbackPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/MainLayout'
import ChatPage from './pages/chat/ChatPage';
import AlbumPage from './pages/album/AlbumPage';
import AdminPage from './pages/Admin/AdminPage';
import NotFoundPage from './pages/404/NotFoundPage';

export default function App() {
  return (
    <> 
       <Routes>
          <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback 
            signInForceRedirectUrl={'/auth-callback'}
          />} />
          <Route path='/auth-callback' element={<AuthCallbackPage/>} />
            <Route path="/admin" element={<AdminPage />}></Route>
          <Route element={<MainLayout />} >
              <Route path='/' element={<HomePage />} >
              </Route>
              <Route path='/chat' element={<ChatPage />}></Route>
              <Route path='/albums/:albumId' element={<AlbumPage />}></Route>
              <Route path='/*' element={<NotFoundPage />}></Route>
          </Route>
       </Routes>
    </>
  );
}