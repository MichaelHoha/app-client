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
            <ul className='lobby-list'>
                {codeBlocks.map(block => (
                    <li className='lobby-item' onClick={() => handleClick(block.title)} key={block.id}>
                        <p>{block.title}</p><button><span>&#8594;</span></button></li>
                ))}
            </ul>
        </div>
    );
};

export default LobbyPage;
