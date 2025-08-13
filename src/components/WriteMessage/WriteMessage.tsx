import './style.scss';

export default function WriteMessage() {
    return (
        <input
            type='text'
            className='input-write-message'
            id='input-write-message'
            placeholder='Введите сообщение...'
        />
    );
}
