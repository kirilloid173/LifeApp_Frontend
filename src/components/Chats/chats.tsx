import BlockCurrentChat from '../BlockCurrentChat/CurrentChat';
import OthersChats from '../LeftSideChats/LeftSide';
import CenterBlock from '../CenterBlock/CenterBlock';
import { useEffect } from 'react';

export default function Chats() {
    return (
        <CenterBlock>
            <OthersChats />
            <BlockCurrentChat />
        </CenterBlock>
    );
}
