import { useWithWhoChatStore } from '../../stores/withWhoChat';

function WithWhoMessages() {
    const withWhoLogin = useWithWhoChatStore((state) => state.withWhoChat);

    return <p>Вы находитесь в чате с {withWhoLogin}</p>;
}

export { WithWhoMessages };
