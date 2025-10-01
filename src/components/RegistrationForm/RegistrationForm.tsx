import './style.scss';
import validateInput from '../../lib/validate';
import sendDataToBackend from './sendDataToBackend';
import { useState } from 'react';
import { useTypeFormStore } from '../../stores/typeForm';

export default function RegistrationForm() {
    type StatusInput = 'error' | '';

    const [inputLoginReg, setInputLoginReg] = useState<string>('');

    const [inputPasswordReg, setInputPasswordReg] = useState<string>('');

    const [errorLoginReg, setErrorLoginReg] = useState<StatusInput>('');

    const [errorPasswordReg, setErrorPasswordReg] = useState<StatusInput>('');

    const typeForm = useTypeFormStore((state) => state.changeTypeForm);

    const resultValidate = (
        statusValidateLogin: boolean,
        statusValidatePassword: boolean,
        loginInput: string,
        passwordInput: string
    ) => {
        // Blocks UI Errors
        if (statusValidateLogin) setErrorLoginReg('');
        if (statusValidatePassword) setErrorLoginReg('');

        if (!statusValidateLogin) setErrorLoginReg('error');
        else setErrorLoginReg('');

        if (!statusValidatePassword) setErrorPasswordReg('error');
        else setErrorPasswordReg('');
        // Blocks UI Errors

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
            validateInput(loginInput, 'login'),
            validateInput(passwordInput, 'password'),
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
                    maxLength={60}
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
            </div>
            <p
                className='form__little-description-form'
                onClick={() => typeForm('login')}
            >
                Уже зарегистрированы?
            </p>
        </div>
    );
}
