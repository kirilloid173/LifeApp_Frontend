import BlockCurrentChat from '../BlockCurrentChat/CurrentChat';
import OthersChats from '../LeftSideChats/LeftSide';
import CenterBlock from '../CenterBlock/CenterBlock';
import { useEffect } from 'react';

export default function Chats() {
    useEffect(() => {
        const socket = new WebSocket('wss://localhost:3000');

        socket.addEventListener('open', () => {
            console.log('Succes connection to WS');
        });
    });
    return (
        <CenterBlock>
            <OthersChats />
            <BlockCurrentChat />
        </CenterBlock>
    );
}
