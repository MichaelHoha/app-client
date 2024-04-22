import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const LobbyPage = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        socket.on('codeBlocks', (blocks) => {
            setCodeBlocks(blocks);
        });

        // Cleanup on unmount
        return () => {
            socket.off('codeBlocks');
        };
    }, []);

    return (
        <div>
            <h1>Choose code block</h1>
            <ul>
                {codeBlocks.map(block => (
                    <li key={block.id}>{block.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default LobbyPage;
