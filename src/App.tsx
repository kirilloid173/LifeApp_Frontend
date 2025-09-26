import Header from './components/Header/header';
import EmptyLoadingPage from './components/EmptyLoadingPage/EmptyLoadingPage';
import ErrorConnectionBackend from './components/ErrorConnectionBackend/ErrorConnectionBackend';
import Chats from './components/Chats/chats';
import AuthPage from './components/AuthPage/authPage';
import { useEffect } from 'react';
import { useStatusAuthStore } from './stores/statusAuth';
import { useLoginNameStore } from './stores/loginName';
import { useTokenUserStore } from './stores/tokenUser';
import { useTriggerCheckAuthStore } from './stores/triggerCheckAuth';
import { useMessagesTreeStore } from './stores/messagesTree';
import { useSocketChannelStore } from './stores/socketChannel';
import { useActiveChatsTreeStore } from './stores/activeChatsTree';

function App() {
    type RolesAuth = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';

    const statusAuth = useStatusAuthStore<RolesAuth>(
        (state) => state.statusAuth
    );

    const changeTriggerAuthStore = useTriggerCheckAuthStore(
        (state) => state.changeValue
    );

    const valueTriggerAuthStore = useTriggerCheckAuthStore(
        (state) => state.value
    );

    const changeStatusAuthStore = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );

    const insertLoginName = useLoginNameStore((state) => state.changeLoginName);

    const tokenUserStore = useTokenUserStore((state) => state.token);
    const changeTokenUserStore = useTokenUserStore(
        (state) => state.changeTokenUser
    );

    const SetMessagesTree = useMessagesTreeStore((state) => state.insertData);

    const ChangeSocketChannelStatus = useSocketChannelStore(
        (state) => state.changeStatus
    );

    const changeActiveChatsTree = useActiveChatsTreeStore(
        (state) => state.changeTree
    );

    const socketChannelStatus = useSocketChannelStore((state) => state.status);
    //
    const getActiveUserChats = () => {
        fetch('api/getActiveUserChats/', {
            method: 'GET',
            credentials: 'include',
        }).then(async (res) => {
            const resultRequest = await res.json();
            if (!resultRequest.error && res.ok) {
                changeActiveChatsTree(resultRequest.tree_active_chats);
            } else if (resultRequest.error === 'uncorrect_token') {
                changeStatusAuthStore('notIsAuth');
            }
        });
    };

    useEffect(() => {
        if (!tokenUserStore) return;

        const ws = new WebSocket(
            `wss://localhost:3000?token=${tokenUserStore}`
        );
        ws.onmessage = (message) => {
            const dataMessage = JSON.parse(message.data);
            if (
                dataMessage.type === 'update_messages' &&
                dataMessage.messages.length
            ) {
                SetMessagesTree(dataMessage.messages);
            }
        };
        ws.onopen = () => console.log('Websocket connection is open');
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(
                    JSON.stringify({
                        type: 'unmount_component',
                        tokenUser: tokenUserStore,
                    })
                );
                ws.close(1000, 'unmount component');
            }
        };
    }, [
        socketChannelStatus,
        ChangeSocketChannelStatus,
        SetMessagesTree,
        tokenUserStore,
    ]);

    useEffect(() => {
        fetch('api/checkAuthUser/', {
            method: 'GET',
            credentials: 'include',
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.statusAuth === true && res.ok && data.loginAuth) {
                    changeStatusAuthStore('isAuth');
                    insertLoginName(data.loginAuth);
                    changeTokenUserStore(data.token);
                    ChangeSocketChannelStatus(true);
                    getActiveUserChats();
                    // User is auth
                } else if (data.error === true || data.statusAuth === false) {
                    changeStatusAuthStore('notIsAuth');
                    ChangeSocketChannelStatus(false);
                    // User is not auth
                }
            })
            .catch((error) => {
                console.error('Connection is not available, error:', error);
                changeStatusAuthStore('errorConnection');
            });
    }, [valueTriggerAuthStore]);
    //
    if (statusAuth === 'errorConnection') {
        return (
            <ErrorConnectionBackend
                retryAgain={() =>
                    changeTriggerAuthStore(valueTriggerAuthStore + 1)
                }
            />
        );
    }
    if (statusAuth === 'unknown') {
        return <EmptyLoadingPage />; // Loading
    }
    if (statusAuth === 'notIsAuth') {
        return <AuthPage />;
    } else if (statusAuth === 'isAuth')
        return (
            <div className='content'>
                <Header />
                {/* Chats, if user are auth */}
                <Chats />
                {/* Chats, if user are auth */}
            </div>
        );
}

export default App;
