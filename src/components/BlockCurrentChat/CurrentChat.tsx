import Messages from '../Messages/Messages';
import WriteMessage from '../WriteMessage/WriteMessage';
import { WithWhoMessages } from '../WithWhoMessages/withWhoMessages';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { AskChooseChat } from '../AskChooseChat/askChooseChat';
import './style.scss';
import { useEffect } from 'react';
import { useTokenUserStore } from '../../stores/tokenUser';

export default function BlockCurrentChat() {
    const tokenUserStore = useTokenUserStore((state) => state.token);

    useEffect(() => {
        if (!tokenUserStore) return;

        const ws = new WebSocket(
            `wss://localhost:3000?token=${tokenUserStore}`
        );

        ws.onopen = () => console.log('Websocket connection is open');
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(
                    JSON.stringify({
                        type: 'unmount_component',
                        tokenUser: tokenUserStore,
                    })
                );
                ws.close(1000, 'unmount component');
            }
        };
    }, [tokenUserStore]);

    const choosenChatStatus = useChoosenChatStore((state) => state.choosen);

    return choosenChatStatus ? (
        <div className='block-current-chat'>
            <WithWhoMessages />
            <Messages />
            <WriteMessage />
        </div>
    ) : (
        <div className='block-current-chat'>
            <AskChooseChat />
        </div>
    );
}
