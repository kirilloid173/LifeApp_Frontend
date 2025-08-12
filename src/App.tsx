import BlockCurrentChat from './components/BlockCurrentChat/CurrentChat';
import Header from './components/Header/header';
import OthersChats from './components/OtherChats/LeftSide';
function App() {
    return (
        <>
            <Header />
            <OthersChats />
            <BlockCurrentChat />
        </>
    );
}

export default App;
