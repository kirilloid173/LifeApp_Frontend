import './style.scss';
import { useMessagesTreeStore } from '../../stores/messagesTree';
export default function Messages() {
    const messagesTree = useMessagesTreeStore((state) => state.tree);
    return (
        <>
            {messagesTree.map((message, index) => (
                <div
                    className={`message ${
                        message.authorMessage ? 'message-out' : 'message-in'
                    }`}
                    key={index}
                >
                    {/* <p>Author</p> */}
                    <p>{message.message}</p>
                </div>
            ))}
        </>
    );
}
