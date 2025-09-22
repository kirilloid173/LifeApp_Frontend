import { useWithWhoChatStore } from '../../stores/withWhoChat';
import './style.scss';
import { useStatusOnlineUserStore } from '../../stores/statusOnlineUser';
function WithWhoMessages() {
    const statusOnlineUser = useStatusOnlineUserStore((state) => state.status);

    const withWhoLogin = useWithWhoChatStore((state) => state.withWhoChat);

    return (
        <p className='with-who'>
            Вы находитесь в чате с {withWhoLogin} (
            {statusOnlineUser ? 'В сети' : 'Не в сети'})
        </p>
    );
}

export { WithWhoMessages };
