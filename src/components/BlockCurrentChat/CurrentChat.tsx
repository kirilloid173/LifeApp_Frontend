import Messages from '../Messages/Messages';
import WriteMessage from '../WriteMessage/WriteMessage';
import './style.scss';

export default function BlockCurrentChat() {
    return (
        <div className='block-current-chat'>
            <Messages />
            <WriteMessage />
        </div>
    );
}
