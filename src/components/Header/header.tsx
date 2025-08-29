import './style.scss';
import { useStatusAuthStore } from '../../stores/statusAuth';
import { usePopupRegStore } from '../../stores/popupReg';
import { useLoginNameStore } from '../../stores/loginName';
import { useEffect, useState } from 'react';
export default function Header() {
    const changePopupStatus = usePopupRegStore(
        (state) => state.changeStatusPopup
    );

    const changeStatusAuthStore = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );

    const loginName = useLoginNameStore((state) => state.loginName);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        console.log(searchValue);
        const timeout = setTimeout(() => {
            if (searchValue.length > 0) {
                fetch('api/findUser', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: searchValue,
                    }),
                });
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
                <input
                    type='text'
                    className='header__search-user'
                    placeholder='Поиск...'
                    defaultValue=''
                    onChange={(e) => setSearchValue(e.target.value)}
                    maxLength={20}
                />
                <p>Здравствуйте {loginName}</p>
                <p className='header__exit' onClick={() => removeAuthUser()}>
                    Выйти
                </p>
            </div>
        </div>
    );
}
