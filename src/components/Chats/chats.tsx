import BlockCurrentChat from '../BlockCurrentChat/CurrentChat';
import OthersChats from '../LeftSideChats/LeftSide';
import CenterBlock from '../CenterBlock/CenterBlock';

export default function Chats() {
    return (
        <CenterBlock>
            <OthersChats />
            <BlockCurrentChat />
        </CenterBlock>
    );
}
