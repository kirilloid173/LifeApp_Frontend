import './style.scss';
import { useStatusAuthStore } from '../../stores/statusAuth';
import { usePopupRegStore } from '../../stores/popupReg';
import { useLoginNameStore } from '../../stores/loginName';
import { useEffect, useState } from 'react';
import { HeaderLoginsResult } from '../HeaderLogins/headerLogins';
import { useSearchPopupStore } from '../../stores/searchUsers';
import { useMessagesTreeStore } from '../../stores/messagesTree';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { useActiveChatsTreeStore } from '../../stores/activeChatsTree';
export default function Header() {
    const changePopupStatus = usePopupRegStore(
        (state) => state.changeStatusPopup
    );

    const changeStatusAuthStore = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );
    const changeResultUsers = useSearchPopupStore(
        (state) => state.changeResultUsers
    );

    const changeMessagesTree = useMessagesTreeStore(
        (state) => state.insertData
    );

    const changeStatusChoosenChat = useChoosenChatStore(
        (state) => state.changeStatus
    );

    const changeActiveChatsTree = useActiveChatsTreeStore(
        (state) => state.changeTree
    );

    const loginName = useLoginNameStore((state) => state.loginName);

    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchValue.length > 0) {
                fetch('api/findUser', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        loginOfUser: loginName,
                        loginInSearch: searchValue,
                    }),
                }).then(async (res) => {
                    if (res.status === 404) {
                        changeResultUsers([{ defaultValue: 'notFound' }]);
                        return;
                    }
                    const data = await res.json();
                    if (res.ok && data.resultSearch.length) {
                        changeResultUsers(data.resultSearch);
                    }
                });
            } else if (searchValue.length === 0) {
                changeResultUsers([{ defaultValue: 'searchEmpty' }]);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    const removeAuthUser = () => {
        fetch('/api/deleteTokenAuth/', {
            method: 'POST',
            credentials: 'include',
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok && data.statusDeleted) {
                changeStatusAuthStore('notIsAuth');
                changePopupStatus('turnOff');
                changeMessagesTree([]);
                changeStatusChoosenChat(false);
                changeActiveChatsTree([]);
            }
        });
    };
    return (
        <div className='header'>
            <div className='header__inner-block'>
                <h1 className='header__name-app'>LifeApp</h1>
            </div>
            <div className='header__outter-block'>
                <div className='outter-block__form-logins-result'>
                    <input
                        type='text'
                        className='header__search-user'
                        placeholder='Поиск пользователя'
                        defaultValue=''
                        onChange={(e) => setSearchValue(e.target.value)}
                        maxLength={20}
                    />
                    <HeaderLoginsResult />
                </div>
                <p>Здравствуйте {loginName}</p>
                <p className='header__exit' onClick={() => removeAuthUser()}>
                    Выйти
                </p>
            </div>
        </div>
    );
}
