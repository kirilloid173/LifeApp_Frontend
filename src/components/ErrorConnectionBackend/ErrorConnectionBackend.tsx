import './style.scss';

export default function ErrorConnectionBackend() {
    return (
        <div className='form form-error-connection-backend'>
            <p className='form__description-sorry-connection'>
                Извините, не удалось подключиться к чатам.
                <br /> Повторите попытку позже
            </p>
            <button className='form__continue-retry'>Повторить попытку</button>
        </div>
    );
}
