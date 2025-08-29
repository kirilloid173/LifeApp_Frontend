import Header from './components/Header/header';
import EmptyLoadingPage from './components/EmptyLoadingPage/EmptyLoadingPage';
import ErrorConnectionBackend from './components/ErrorConnectionBackend/ErrorConnectionBackend';
import { useEffect, useState } from 'react';
import { useStatusAuthStore } from './stores/statusAuth';
import Chats from './components/Chats/chats';
import AuthPage from './components/AuthPage/authPage';
import { useLoginNameStore } from './stores/loginName';
function App() {
    type RolesAuth = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';
    const statusAuth = useStatusAuthStore<RolesAuth>(
        (state) => state.statusAuth
    );
    const [retryAgain, setRetryAgain] = useState<number>(0);
    const changeStatusAuthStore = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );
    const insertLoginName = useLoginNameStore((state) => state.changeLoginName);
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
                    // User is auth
                } else if (data.statusAuth === false) {
                    changeStatusAuthStore('notIsAuth');
                    // User is not auth
                }
            })
            .catch((error) => {
                console.error('Connection is not available, error:', error);
                changeStatusAuthStore('errorConnection');
            });
    }, [retryAgain]);
    //
    if (statusAuth === 'errorConnection') {
        return (
            <ErrorConnectionBackend
                retryAgain={() => setRetryAgain((prev) => prev + 1)}
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
