import './style.scss';

export default function CenterBlock({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className='center-block'>{children}</div>;
}
