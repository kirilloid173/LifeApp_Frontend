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
    const useAuthStore = storeStatusAuth<Roles>((state) => state.statusAuth);
    const [retryAgain, setRetryAgain] = useState<number>(0);
    const changeStatusAuthStore = statusAuthStore(
        (state) => state.changeStatus
    );
    //
    useEffect(() => {
        fetch('http://127.0.0.1:3000/checkAuthUser/', {
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.error) {
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
    if (useAuthStore === 'errorConnection') {
        return (
            <ErrorConnectionBackend
                retryAgain={() => setRetryAgain((prev) => prev + 1)}
            />
        );
    }
    if (useAuthStore === 'unknown') {
        return <EmptyLoadingPage />; // Loading
    }
    if (useAuthStore === 'notIsAuth') {
        return <RegistrationPage />;
    } else if (useAuthStore === 'isAuth')
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
