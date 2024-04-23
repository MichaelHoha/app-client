import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';
import './LobbyPage.css'

// listens to server port
const socket = io('http://localhost:3001');


// data example
const data = [{
    title: "Test",
    code: "flag? true : false"
}, {
    title: "Test2",
    code: "Async await"
}, {
    title: "Test3",
    code: "Promises"
},
]

const LobbyPage = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);

    // collecting the data example to hook
    useEffect(() => {
        setCodeBlocks(data);
        console.log("This is the code blocks " + codeBlocks);
    }, []);


    // opens pipe line to the server. NOT WORKING YET!!
    useEffect(() => {
        socket.on('codeBlocks', (blocks) => {
            setCodeBlocks(blocks);
        });

        // Cleanup on unmount
        return () => {
            socket.off('codeBlocks');
        };
    }, []);

    // open new navigations urls
    const navigate = useNavigate();

    const handleClick = (value) => navigate('/code/' + value)

    return (
        <div className='lobby-page'>
            <h1>Choose code block</h1>
            <ul>
                {codeBlocks.map(block => (
                    <h2 onClick={() => handleClick(block.title)} key={block.id}>{block.title}</h2>
                ))}
            </ul>
        </div>
    );
};

export default LobbyPage;
