import { useState } from 'react';
import './style.scss';
import { validateReg } from './validate';
export default function RegistrationForm() {
    const [choosenUserOption, setUserIsAuth] = useState<string>('reg');
    const [inputReg, setInputReg] = useState<string>('');
    const [statusRegInput, setStatusRegInput] = useState<string>('');
    //
    const changeForm = () => {
        setUserIsAuth(choosenUserOption === 'reg' ? 'login' : 'reg');
    };

    const resultValidate = (statusValidate: boolean) => {
        console.log('ResultValidate -> ', statusValidate);

        if (statusValidate) {
            setStatusRegInput('');
            
        } else {
            setStatusRegInput('error');
        }
    };

    const sendValidateData = (inputReg: string) => {
        resultValidate(validateReg(inputReg));
    };

    return (
        <div className='form'>
            <p className='form__title-form'>
                {choosenUserOption === 'reg' ? 'Регистрация' : 'Вход'}
            </p>
            <div className='form__registration-form form__form-auth'>
                {choosenUserOption === 'reg' ? (
                    <p>Придумайте и запомните ваш ID</p>
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
                        onChange={(e) => setInputReg(e.target.value)}
                        className={statusRegInput}
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
                    <button onClick={() => sendValidateData(inputReg)}>
                        Зарегистрироваться
                    </button>
                ) : (
                    <button>Войти в аккаунт</button>
                )}
                {choosenUserOption === 'reg' ? (
                    <p className='form__description-form-reg'>
                        Любой набор латинский букв или цифр
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
