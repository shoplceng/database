import React from "react";
import axios from 'axios';
import Button from '@mui/material/Button';

const SendEmail = () => {
  const handleSendEmail = async () => {
    console.log("Testing email backup paths");

    try {
      const response = await axios.post('/test-email'); // Replace with your actual backend endpoint
      if (response.status >= 200 && response.status < 300) {
        console.log('Email sent successfully');
        alert('Email sent successfully!');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  const createBackup = async () => {
    console.log('making csv backup');

    try {
        await axios.post('/makeCopy');
        console.log('made csv backup');
    }   catch {
        console.error('Error making backup');
        alert('Failed making backup');
    }
  };

  return (
    <>
    <Button variant="contained" onClick={handleSendEmail}>
      Send Email
    </Button>
    <Button variant="contained" onClick={createBackup}>
        Make backup
    </Button>
    </>
  );
};

export default SendEmail;
