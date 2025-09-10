import Header from './components/Header/header';
import EmptyLoadingPage from './components/EmptyLoadingPage/EmptyLoadingPage';
import ErrorConnectionBackend from './components/ErrorConnectionBackend/ErrorConnectionBackend';
import Chats from './components/Chats/chats';
import AuthPage from './components/AuthPage/authPage';
import { useEffect, useState } from 'react';
import { useStatusAuthStore } from './stores/statusAuth';
import { useLoginNameStore } from './stores/loginName';
import { useTokenUserStore } from './stores/tokenUser';
import { useTriggerCheckAuthStore } from './stores/triggerCheckAuth';

function App() {
    type RolesAuth = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';

    const statusAuth = useStatusAuthStore<RolesAuth>(
        (state) => state.statusAuth
    );

    const changeTriggerAuthStore = useTriggerCheckAuthStore(
        (state) => state.changeValue
    );

    const valueTriggerAuthStore = useTriggerCheckAuthStore(
        (state) => state.value
    );

    const changeStatusAuthStore = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );

    const insertLoginName = useLoginNameStore((state) => state.changeLoginName);

    const changeTokenUser = useTokenUserStore((state) => state.changeTokenUser);
    //
    useEffect(() => {
        fetch('api/checkAuthUser/', {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.statusAuth === true && res.ok && data.loginAuth) {
                    changeStatusAuthStore('isAuth');
                    insertLoginName(data.loginAuth);
                    changeTokenUser(data.token);
                    console.log('TEST MAN');
                    // User is auth
                } else if (data.error === true || data.statusAuth === false) {
                    changeStatusAuthStore('notIsAuth');
                    // User is not auth
                }
            })
            .catch((error) => {
                console.error('Connection is not available, error:', error);
                changeStatusAuthStore('errorConnection');
            });
    }, [valueTriggerAuthStore]);
    //
    if (statusAuth === 'errorConnection') {
        return (
            <ErrorConnectionBackend
                retryAgain={() =>
                    changeTriggerAuthStore(valueTriggerAuthStore + 1)
                }
            />
        );
    }
    if (statusAuth === 'unknown') {
        return <EmptyLoadingPage />; // Loading
    }
    if (statusAuth === 'notIsAuth') {
        return <AuthPage />;
    } else if (statusAuth === 'isAuth')
        return (
            <div className='content'>
                <Header />
                {/* Chats, if user are auth */}
                <Chats />
                {/* Chats, if user are auth */}
            </div>
        );
}

export default App;
