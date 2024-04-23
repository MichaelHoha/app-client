import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');


const CodeBlockPage = ({ match }) => {
    const [codeBlock, setCodeBlock] = useState(null);

    // useEffect(() => {
    //     const blockId = match.params.id;
    //     socket.emit('joinRoom', blockId);

    //     socket.on('codeBlock', (block) => {
    //         setCodeBlock(block);
    //     });

    //     // Cleanup on unmount
    //     return () => {
    //         socket.emit('leaveRoom', blockId);
    //         socket.off('codeBlock');
    //     };
    // }, [match.params.id]);

    return (
        <div>
            <h1>Code Block</h1>
            {codeBlock && (
                <div>
                    <h2>{codeBlock.title}</h2>
                    <pre>{codeBlock.code}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeBlockPage;
