import { useState } from 'react';
import './style.scss';
export default function RegistrationForm() {
    const [choosenUserOption, setUserIsAuth] = useState('reg');

    const changeForm = () => {
        setUserIsAuth(choosenUserOption === 'reg' ? 'login' : 'reg');
    };
    return (
        <div className='form'>
            <p className='form__title-form'>
                {choosenUserOption === 'reg' ? 'Регистрация' : 'Вход'}
            </p>
            <div className='form__registration-form form__form-auth'>
                {choosenUserOption === 'reg' ? (
                    <p>Придумайте ваш ID</p>
                ) : (
                    <p>Введите ваш ID</p>
                )}
                {choosenUserOption === 'reg' ? (
                    <input
                        type='text'
                        id='reg'
                        placeholder='Ваш новый ID'
                        maxLength={20}
                        key='reg'
                    />
                ) : (
                    <input
                        type='text'
                        id='login'
                        placeholder='Ваш ID'
                        maxLength={20}
                        key='login'
                    />
                )}

                {choosenUserOption === 'reg' ? (
                    <button>Зарегистрироваться</button>
                ) : (
                    <button>Войти в аккаунт</button>
                )}
                {choosenUserOption === 'reg' ? (
                    <p className='form__description-form-reg'>
                        Просто любой порядок символов или букв
                    </p>
                ) : null}
            </div>
            {choosenUserOption === 'reg' ? (
                <p
                    className='form__little-description-form'
                    onClick={changeForm}
                >
                    Уже зарегистрированы?
                </p>
            ) : (
                <p
                    className='form__little-description-form'
                    onClick={changeForm}
                >
                    Ещё не зарегистрированы?
                </p>
            )}
        </div>
    );
}
