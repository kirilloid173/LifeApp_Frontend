import BlockCurrentChat from './components/BlockCurrentChat/CurrentChat';
import Header from './components/Header/header';
import OthersChats from './components/LeftSideChats/LeftSide';
import CenterBlock from './components/CenterBlock/CenterBlock';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import { useEffect, useState } from 'react';

function App() {
    const [userIsAuth, setUserIsAuth] = useState<undefined | boolean>(
        undefined
    );

    useEffect(() => {
        console.log('connection is started');
        fetch('http://localhost:3000/checkAuthUser/', {
            credentials: 'include',
        }).then(async (res) => {
            const data = await res.json();
            if (!res) {
                throw new Error('Connection is disabled');
            } else if (data.error) {
                setUserIsAuth(false); // User is not auth
            } else {
                setUserIsAuth(true);
            }
        });
    }, []);

    if (userIsAuth === false) {
        return <RegistrationPage />;
    } else
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
