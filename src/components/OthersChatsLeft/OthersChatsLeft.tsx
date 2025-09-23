import './style.scss';
import { useActiveChatsTreeStore } from '../../stores/activeChatsTree';
import { useSearchPopupStore } from '../../stores/searchUsers';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { useWithWhoChatStore } from '../../stores/withWhoChat';
import { useMessagesTreeStore } from '../../stores/messagesTree';
import { useStatusOnlineUserStore } from '../../stores/statusOnlineUser';

export default function OtherChatLeft() {
    const activeChatsTree = useActiveChatsTreeStore((state) => state.tree);
    const choosenChatStatus = useChoosenChatStore(
        (state) => state.changeStatus
    );

    const valueChoosenChatStatus = useChoosenChatStore(
        (state) => state.choosen
    );

    const insertMessagesTree = useMessagesTreeStore(
        (state) => state.insertData
    );

    const changeWithWhoChatLogin = useWithWhoChatStore(
        (state) => state.changeWithWhoChat
    );

    const changeSearchPopupStatus = useSearchPopupStore(
        (state) => state.changeResultUsers
    );

    const changeStatusOnlineUser = useStatusOnlineUserStore(
        (state) => state.changeStatus
    );

    const getChatData = (loginSecondUser: string) => {
        fetch('api/getChatIdAndMessages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                withWho: loginSecondUser,
            }),
        }).then(async (res) => {
            const data = await res.json();
            insertMessagesTree(data.messages);
            changeStatusOnlineUser(data.status_online_user);
            choosenChatStatus(true);
            changeSearchPopupStatus([{ defaultValue: 'searchEmpty' }]); // Remove search popup
            changeWithWhoChatLogin(loginSecondUser);
        });
    };
    return activeChatsTree.length === 0 ? (
        <p className='warning-empty-chats-text'>
            {!valueChoosenChatStatus ? 'Ваш список чатов пуст' : ''}
        </p>
    ) : (
        activeChatsTree.map((chat, index) => (
            <div
                onClick={() => getChatData(chat.login)}
                className='other-chat-left'
                key={index}
            >
                <p className='other-chat-left__name-chat'>{chat.login}</p>
                <p className='other-chat-left__content-chat'>{chat.message}</p>
                <p className='other-chat-left__data-chat'>{chat.date_time}</p>
            </div>
        ))
    );
}
