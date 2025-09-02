import './style.scss';
import { useSearchPopupStore } from '../../stores/searchUsers';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { useWithWhoChatStore } from '../../stores/withWhoChat';

function HeaderLoginsResult() {
    const choosenChatStatus = useChoosenChatStore(
        (state) => state.changeStatus
    );

    const changeWithWhoChatLogin = useWithWhoChatStore(
        (state) => state.changeWithWhoChat
    );

    const resultUsers = useSearchPopupStore((state) => state.resultUsers);
    const changeSearchPopupStatus = useSearchPopupStore(
        (state) => state.changeResultUsers
    );
    const userChoosen = (loginUser?: string) => {
        if (!loginUser || !loginUser.length) {
            return;
        }
        choosenChatStatus(true);
        changeSearchPopupStatus([{ defaultValue: 'searchEmpty' }]);
        changeWithWhoChatLogin(loginUser);
    };

    return (
        <>
            {resultUsers[0].defaultValue === 'notFound' ? (
                <div className='result-logins'>
                    <div className='result-logins__login-result'>
                        <p>Пользователи не найдены</p>
                    </div>
                </div>
            ) : null}

            {resultUsers.length && !resultUsers[0].defaultValue ? (
                <div className='result-logins'>
                    {resultUsers.map((item, index) => (
                        <div
                            key={index}
                            className='result-logins__login-result'
                        >
                            <p
                                className='login-result__name text-hover'
                                onClick={() => userChoosen(item.login)}
                            >
                                {item.login}
                            </p>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
}

export { HeaderLoginsResult };
