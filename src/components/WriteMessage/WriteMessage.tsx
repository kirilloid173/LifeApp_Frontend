import './style.scss';
import { useState } from 'react';
import { useWithWhoChatStore } from '../../stores/withWhoChat';

export default function WriteMessage() {
    const [messageText, changeMessageText] = useState('');

    const withWhoChat = useWithWhoChatStore((state) => state.withWhoChat);

    const [errorTextarea, changeErrorTextarea] = useState(false);

    const sendMessage = async () => {
        if (!messageText.length) {
            changeErrorTextarea(true);
            setTimeout(() => {
                changeErrorTextarea(false);
            }, 4000);

            return false;
        }
        try {
            const response = await fetch('api/sendMessage', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    withWhoChat: withWhoChat,
                    messageText: messageText,
                }),
            });

            if (!response.ok) {
                throw new Error('Error of fetch: ' + response.status);
            }

            changeMessageText('');
        } catch (error) {
            console.log('Cannot send message, error -> ', error);
        }
    };

    const listenKeyboardKeys = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };
    return (
        <div className='block-write-messages'>
            <textarea
                className={`${
                    errorTextarea === true ? 'error ' : ''
                }block-write-messages__textarea`}
                id='block-write-messages__textarea'
                placeholder='Введите сообщение...'
                value={messageText}
                onChange={(e) => changeMessageText(e.target.value)}
                onKeyDown={(e) => listenKeyboardKeys(e)}
                maxLength={1000}
            />
            <button
                className='block-write-messages__send-message'
                onClick={sendMessage}
            >
                Отправить
            </button>
        </div>
    );
}
