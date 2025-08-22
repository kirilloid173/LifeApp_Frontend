import { useState } from 'react';
import './style.scss';
import validateInput from './validate';
import sendDataToBackend from './sendDataToBackend';
export default function RegistrationForm() {
    type statusInput = 'error' | '';

    const [inputLoginReg, setInputLoginReg] = useState<string>('');
    const [inputPasswordReg, setInputPasswordReg] = useState<string>('');
    const [errorLoginReg, setErrorLoginReg] = useState<statusInput>('');
    const [errorPasswordReg, setErrorPasswordReg] = useState<statusInput>('');
    //
    // const changeForm = () => {
    //     setUserIsAuth(choosenUserOption === 'reg' ? 'login' : 'reg');
    // };

    const resultValidate = (
        statusValidateLogin: boolean,
        statusValidatePassword: boolean,
        loginInput: string,
        passwordInput: string
    ) => {
        //Block UI Errors
        if (statusValidateLogin) setErrorLoginReg('');
        if (statusValidatePassword) setErrorLoginReg('');

        if (!statusValidateLogin) setErrorLoginReg('error');
        else setErrorLoginReg('');

        if (!statusValidatePassword) setErrorPasswordReg('error');
        else setErrorPasswordReg('');
        // Block UI Errors

        if (statusValidateLogin && statusValidatePassword)
            sendDataToBackend(
                statusValidateLogin,
                statusValidatePassword,
                loginInput,
                passwordInput
            );
    };

    const sendValidateData = (loginInput: string, passwordInput: string) => {
        resultValidate(
            validateInput(loginInput),
            validateInput(passwordInput),
            loginInput,
            passwordInput
        );
    };

    return (
        <div className='form'>
            <p className='form__title-form'>Регистрация</p>
            <div className='form__registration-form form__form-auth'>
                <p>Придумайте логин</p>
                <input
                    type='text'
                    id='login'
                    placeholder='Логин'
                    maxLength={20}
                    onChange={(e) => setInputLoginReg(e.target.value)}
                    className={errorLoginReg}
                />
                <p>Придумайте пароль</p>
                <input
                    type='password'
                    id='password'
                    placeholder='Пароль'
                    maxLength={128}
                    onChange={(e) => setInputPasswordReg(e.target.value)}
                    className={errorPasswordReg}
                />
                <button
                    onClick={() =>
                        sendValidateData(inputLoginReg, inputPasswordReg)
                    }
                >
                    Зарегистрироваться
                </button>

                {/* <p className='form__description-form-reg'>
                    Любой набор латинский букв или цифр
                </p> */}
            </div>

            <p className='form__little-description-form'>
                Уже зарегистрированы?
            </p>

            {/* <p className='form__little-description-form'>
                Ещё не зарегистрированы?
            </p> */}
        </div>
    );
}
