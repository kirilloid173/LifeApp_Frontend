import './style.scss';
import { useSearchPopupStore } from '../../stores/searchUsers';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { useWithWhoChatStore } from '../../stores/withWhoChat';
import { useMessagesTreeStore } from '../../stores/messagesTree';
import { useStatusOnlineUserStore } from '../../stores/statusOnlineUser';
import { useStatusMobileMenuStore } from '../../stores/mobileMenu';

function HeaderLoginsResult() {
    const choosenChatStatus = useChoosenChatStore(
        (state) => state.changeStatus
    );

    const insertMessagesTree = useMessagesTreeStore(
        (state) => state.insertData
    );

    const changeWithWhoChatLogin = useWithWhoChatStore(
        (state) => state.changeWithWhoChat
    );

    const resultUsers = useSearchPopupStore((state) => state.resultUsers);

    const changeSearchPopupStatus = useSearchPopupStore(
        (state) => state.changeResultUsers
    );

    const changeStatusOnlineUser = useStatusOnlineUserStore(
        (state) => state.changeStatus
    );

    const changeStatusMobileMenu = useStatusMobileMenuStore(
        (state) => state.changeStatus
    );

    const userChoosen = (loginUser?: string) => {
        if (!loginUser || !loginUser.length) {
            return;
        }

        if (loginUser) {
            fetch('api/getChatIdAndMessages', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    withWho: loginUser,
                }),
            }).then(async (res) => {
                const data = await res.json();
                if (res.ok && !data.error && data.messages) {
                    insertMessagesTree(data.messages);
                    changeStatusOnlineUser(data.status_online_user);
                    choosenChatStatus(true);
                    changeSearchPopupStatus([{ defaultValue: 'searchEmpty' }]); // Remove search popup
                    changeWithWhoChatLogin(loginUser);
                    changeStatusMobileMenu(false);
                }
            });
        }
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
