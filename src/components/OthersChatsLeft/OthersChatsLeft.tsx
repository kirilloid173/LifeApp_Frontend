import './style.scss';
import { useActiveChatsTreeStore } from '../../stores/activeChatsTree';
export default function OtherChatLeft() {
    const activeChatsTree = useActiveChatsTreeStore((state) => state.tree);

    return activeChatsTree.map((chat, index) => (
        <div className='other-chat-left' key={index}>
            <p className='other-chat-left__name-chat'>{chat.login}</p>
            <p className='other-chat-left__content-chat'>{chat.message}</p>
            <p className='other-chat-left__data-chat'>{chat.date_time}</p>
        </div>
    ));
}
