import './style.scss';
import { useStatusAuthStore } from '../../stores/statusAuth';
import { usePopupRegStore } from '../../stores/popupReg';
import { useLoginNameStore } from '../../stores/loginName';
import { useEffect, useState } from 'react';
import { HeaderLoginsResult } from '../HeaderLogins/headerLogins';
import { useSearchPopupStore } from '../../stores/searchUsers';

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

    const loginName = useLoginNameStore((state) => state.loginName);

    const changeLoginNameHeader = useLoginNameStore(
        (state) => state.changeLoginName
    );

    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        fetch('api/checkAuthUser/', {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.statusAuth === true && res.ok && data.loginAuth) {
                    changeLoginNameHeader(data.loginAuth);
                }
            })
            .catch((error) => {
                console.error('Connection is not available, error:', error);
                changeStatusAuthStore('errorConnection');
            });
    }, []);

    useEffect(() => {});

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
                    console.log(data.resultSearch);
                    if (res.ok && data.resultSearch.length) {
                        console.log(data.resultSearch);
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
