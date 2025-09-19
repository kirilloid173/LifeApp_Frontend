import { useWithWhoChatStore } from '../../stores/withWhoChat';
import './style.scss';
function WithWhoMessages() {
    const withWhoLogin = useWithWhoChatStore((state) => state.withWhoChat);

    return <p className='with-who'>Вы находитесь в чате с {withWhoLogin}</p>;
}

export { WithWhoMessages };
