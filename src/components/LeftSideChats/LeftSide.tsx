import BlockOtherChats from '../BlockOthersChats/BlockOthersChats';
import './style.scss';
import { useChoosenChatStore } from '../../stores/choosenChat';
import { useEffect, useState } from 'react';

export default function OthersChats() {
    const statusChoosenChat = useChoosenChatStore((state) => state.choosen);
    const [isSmallMobileViewport, changeIsSmallMobileViewport] = useState(
        window.innerWidth < 580 && statusChoosenChat
    );

    useEffect(() => {
        const checkViewport = () => {
            if (statusChoosenChat) {
                changeIsSmallMobileViewport(
                    window.innerWidth < 580 && statusChoosenChat
                );
            }
        };
        changeIsSmallMobileViewport(
            window.innerWidth < 580 && statusChoosenChat
        );
        window.addEventListener('resize', checkViewport);
    }, [statusChoosenChat]);

    return !isSmallMobileViewport ? (
        <div className='left-side'>
            <BlockOtherChats />
        </div>
    ) : null;
}
