import BlockCurrentChat from './components/BlockCurrentChat/CurrentChat';
import Header from './components/Header/header';
import OthersChats from './components/OtherChats/LeftSide';
import CenterBlock from './components/CenterBlock/CenterBlock';
function App() {
    return (
        <>
            <Header />
            <CenterBlock>
                <OthersChats />
                <BlockCurrentChat />
            </CenterBlock>
        </>
    );
}

export default App;
