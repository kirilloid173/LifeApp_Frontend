import BlockCurrentChat from './components/BlockCurrentChat/CurrentChat';
import Header from './components/Header/header';
import OthersChats from './components/LeftSideChats/LeftSide';
import CenterBlock from './components/CenterBlock/CenterBlock';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import EmptyLoadingPage from './components/EmptyLoadingPage/EmptyLoadingPage';
import ErrorConnectionBackend from './components/ErrorConnectionBackend/ErrorConnectionBackend';
import { useEffect, useState } from 'react';
import storeStatusAuth from './stores/statusAuth.ts';
import statusAuthStore from './stores/statusAuth.ts';
function App() {
    type Roles = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';
    // const [userIsAuth, setUserIsAuth] = useState<Roles>('unknown');
    const statusAuth = storeStatusAuth<Roles>((state) => state.statusAuth);
    const [retryAgain, setRetryAgain] = useState<number>(0);
    const changeStatusAuthStore = statusAuthStore(
        (state) => state.changeStatusAuth
    );
    //
    useEffect(() => {
        fetch('/api/checkAuthUser/', {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.statusAuth && res.ok) {
                    changeStatusAuthStore('isAuth');
                    // User is auth
                } else {
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
        return <RegistrationPage />;
    } else if (statusAuth === 'isAuth')
        return (
            <div className='content'>
                <Header />
                {/* Chat, if user are auth */}
                <CenterBlock>
                    <OthersChats />
                    <BlockCurrentChat />
                </CenterBlock>
                {/* Chat, if user are auth */}
            </div>
        );
}

export default App;
