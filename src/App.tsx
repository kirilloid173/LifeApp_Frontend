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

    useEffect(() => {
        fetch('http://localhost:3000/checkAuthUser/', {
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.error) {
                    setUserIsAuth('notIsAuth'); // User is not auth
                }
                // TODO: MAKE UP (Not Completed fully)
            })
            .catch((error) => {
                console.error('Connection is not available, error:', error);
                setUserIsAuth('errorConnection');
            });
    }, []);
    //
    if (userIsAuth === 'errorConnection') {
        return <ErrorConnectionBackend />;
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
