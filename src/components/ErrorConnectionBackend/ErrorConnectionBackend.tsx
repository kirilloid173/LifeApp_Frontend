import './style.scss';

export default function ErrorConnectionBackend({
    retryAgain,
}: {
    retryAgain: () => void;
}) {
    return (
        <div className='form form-error-connection-backend'>
            <p className='form__description-sorry-connection'>
                Извините, не удалось подключиться к чатам.
                <br /> Повторите попытку позже
            </p>
            <button className='form__continue-retry' onClick={retryAgain}>
                Повторить попытку
            </button>
        </div>
    );
}
