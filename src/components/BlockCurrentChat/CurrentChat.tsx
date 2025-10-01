import './style.scss';
import Messages from '../Messages/Messages';
import WriteMessage from '../WriteMessage/WriteMessage';
import { WithWhoMessages } from '../WithWhoMessages/withWhoMessages';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { AskChooseChat } from '../AskChooseChat/askChooseChat';

export default function BlockCurrentChat() {
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
