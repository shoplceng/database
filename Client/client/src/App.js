import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav'
import CollapsibleTable from './components/tabs.tsx';
import HomeDashboard from './components/HomeDashboard.js';
import './App.css'
import DocumentationPage from './components/DocumentationPage.js';
import Multiviewer from './components/Multiviewer.js';
import SignInPage from './components/SignInPage.js';
import ProjectManagement from './components/ProjectManagement.js';
import EditPage from './components/EditPage.tsx';
import Form from './components/Form.js'
import SendEmail from './components/email_test.js';
import ReactVirtualizedTable from './components/rabbitears.js';
import { AuthProvider, useAuth } from './components/AuthContext.js';



function App() {

const {isAuthenticated} = useAuth();
//const roleCheck = RoleCheck();



  return (
    <BrowserRouter>
    {isAuthenticated ? (
        <>
            <Nav /> {/*Only show Nav if authenticated*/}
            <div className='table'>
                <Routes>
                    <Route path="/" element={<CollapsibleTable />} />
                    <Route path="home" element={<HomeDashboard />} />
                    <Route path="affiliates" element={<CollapsibleTable />} />
                    <Route path="docs" element={<DocumentationPage />} />
                    <Route path='multiviewer' element={<Multiviewer />} />
                    <Route path='ProjMgmt' element={<ProjectManagement />} />
                    <Route path='edit/:id' element={<EditPage />} />
                    <Route path='form' element={<Form />} />
                    <Route path='email-test' element={<SendEmail />} />
                    <Route path='rabbitears' element={<ReactVirtualizedTable />}/>
                </Routes>

            </div>
        </>
    ) : (
        <Routes>
            <Route path="signin" element={<SignInPage />} />
            <Route path="*" element={<SignInPage />} /> {/* Fallback to SignInPage */}
        </Routes>
    )}
</BrowserRouter>


      );
}

export default function WrappedApp() {
  return (
      <AuthProvider>
          <App />
      </AuthProvider>
  );
}
