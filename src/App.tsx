import BlockCurrentChat from './components/BlockCurrentChat/CurrentChat';
import Header from './components/Header/header';
import OthersChats from './components/LeftSideChats/LeftSide';
import CenterBlock from './components/CenterBlock/CenterBlock';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import { useEffect, useState } from 'react';

function App() {
    const [userIsAuth, setUserIsAuth] = useState(false);

    if (userIsAuth === false) {
        return <RegistrationPage />;
    }
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
