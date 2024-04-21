import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the server

function App() {
  const [usersData, setUsersData] = useState({ users: [] });

  useEffect(() => {
    // Listen for 'dataUpdate' event from the server
    socket.on('dataUpdate', (updatedData) => {
      setUsersData(prevState => ({ ...prevState, users: updatedData.users }));
    });

    // Clean up event listener on component unmount
    return () => {
      socket.off('dataUpdate');
    };
  }, []);

  return (
    <div className="App">
      {(typeof usersData.users === 'undefined') ?
        <h1>Loading...</h1>
        : (usersData.users.map((value, index) => {
          return (<h1 key={index}>{value}</h1>);
        }))
      }
    </div>
  );
}

export default App;
