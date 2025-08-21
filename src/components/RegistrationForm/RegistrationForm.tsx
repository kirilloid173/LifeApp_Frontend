import { useState } from 'react';
import './style.scss';
import { validateInput } from './validate';
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
        console.log('ResultValidateLogin -> ', statusValidateLogin);

        if (statusValidateLogin && statusValidatePassword) {
            fetch('http://127.0.0.1:3000/regNewUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    loginUser: loginInput,
                    passwordUser: passwordInput,
                }),
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (!data.error) {
                        console.log('User is created');
                    } else {
                        console.log('Error, ', data.error);
                    }
                })
                .catch((error) => {
                    console.log(
                        'Cannot connect to backend service, error -> ',
                        error
                    );
                });
        }

        if (!statusValidateLogin) setErrorLoginReg('error');
        else setErrorLoginReg('');

        if (!statusValidatePassword) setErrorPasswordReg('error');
        else setErrorPasswordReg('');
    };

    const sendValidateData = (loginInput: string, passwordInput: string) => {
        resultValidate(validateInput(loginInput), loginInput, passwordInput);
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
