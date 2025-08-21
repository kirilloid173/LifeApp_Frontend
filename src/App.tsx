import BlockCurrentChat from './components/BlockCurrentChat/CurrentChat';
import Header from './components/Header/header';
import OthersChats from './components/LeftSideChats/LeftSide';
import CenterBlock from './components/CenterBlock/CenterBlock';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import EmptyLoadingPage from './components/EmptyLoadingPage/EmptyLoadingPage';
import ErrorConnectionBackend from './components/ErrorConnectionBackend/ErrorConnectionBackend';
import { useEffect, useState } from 'react';

function App() {
    type Roles = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';
    const [userIsAuth, setUserIsAuth] = useState<Roles>('unknown');
    const [retryAgain, setRetryAgain] = useState<number>(0);
    //
    useEffect(() => {
        fetch('http://127.0.0.1:3000/checkAuthUser/', {
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.error) {
                    setUserIsAuth('notIsAuth'); // User is not auth
                }
            })
            .catch((error) => {
                console.error('Connection is not available, error:', error);
                setUserIsAuth('errorConnection');
            });
    }, [retryAgain]);
    //
    if (userIsAuth === 'errorConnection') {
        return (
            <ErrorConnectionBackend
                retryAgain={() => setRetryAgain((prev) => prev + 1)}
            />
        );
    }
    if (userIsAuth === 'unknown') {
        return <EmptyLoadingPage />; // Loading
    }
    if (userIsAuth === 'notIsAuth') {
        return <RegistrationPage />;
    } else if (userIsAuth === 'isAuth')
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
