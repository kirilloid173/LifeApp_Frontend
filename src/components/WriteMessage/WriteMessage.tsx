import { useRef } from 'react';
import './style.scss';
import { useWithWhoChatStore } from '../../stores/withWhoChat';
export default function WriteMessage() {
    const messageText = useRef('');
    const withWhoChat = useWithWhoChatStore((state) => state.withWhoChat);
    const sendMessage = () => {
        fetch('api/sendMessage', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                withWhoChat: withWhoChat,
                messageText: messageText.current,
            }),
        });
    };

    return (
        <>
            <div className='block-write-messages'>
                <textarea
                    className='input-write-message'
                    id='input-write-message'
                    placeholder='Введите сообщение...'
                    onChange={(e) => (messageText.current = e.target.value)}
                    maxLength={1000}
                />
                <button
                    className='block-write-messages__send-message'
                    onClick={sendMessage}
                >
                    Отправить
                </button>
            </div>
        </>
    );
}
