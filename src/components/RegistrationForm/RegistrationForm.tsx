import './style.scss';
import validateInput from '../../lib/validate';
import sendDataToBackend from './sendDataToBackend';
import { useState } from 'react';
import { useTypeFormStore } from '../../stores/typeForm';
import { useTextErrorFormStore } from '../../stores/textErrorForm';

export default function RegistrationForm() {
    type StatusInput = 'error' | '';

    const [inputLoginReg, setInputLoginReg] = useState<string>('');

    const [inputPasswordReg, setInputPasswordReg] = useState<string>('');

    const [errorLoginReg, setErrorLoginReg] = useState<StatusInput>('');

    const [errorPasswordReg, setErrorPasswordReg] = useState<StatusInput>('');

    const typeForm = useTypeFormStore((state) => state.changeTypeForm);

    const textErrorForm = useTextErrorFormStore((state) => state.textError);

    const changeTextErrorForm = useTextErrorFormStore(
        (state) => state.changeTextError
    );

    const resultValidate = async (
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

        if (statusValidateLogin && statusValidatePassword) {
            const resultSendData = await sendDataToBackend(
                statusValidateLogin,
                statusValidatePassword,
                loginInput,
                passwordInput
            );
            if (resultSendData === 409) {
                changeTextErrorForm('Извините, такой аккаунт уже создан');
                setTimeout(() => {
                    changeTextErrorForm('');
                }, 5000);
            }
        }
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
                <p className='text-error-form'>{textErrorForm}</p>
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
