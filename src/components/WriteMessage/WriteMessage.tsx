import { useRef } from 'react';
import './style.scss';

export default function WriteMessage() {
    const messageText = useRef('');
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
                <button className='block-write-messages__send-message'>
                    Отправить
                </button>
            </div>
        </>
    );
}
