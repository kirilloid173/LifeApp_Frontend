import { useState } from 'react';
import { useTypeFormStore } from '../../stores/typeForm';
import { checkAuthUser } from './checkAuthUser';
function LoginForm() {
    const typeForm = useTypeFormStore((state) => state.changeTypeForm);
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    return (
        <>
            <div className='form'>
                <p className='form__title-form'>Вход в аккаунт</p>
                <div className='form__registration-form form__form-auth'>
                    <p>Введите ваш логин</p>
                    <input
                        type='text'
                        id='login'
                        placeholder='Логин'
                        maxLength={20}
                        onChange={(e) => setInputLogin(e.target.value)}
                    />
                    <p>Введите ваш пароль</p>
                    <input
                        type='password'
                        id='password'
                        placeholder='Пароль'
                        maxLength={128}
                        onChange={(e) => setInputPassword(e.target.value)}
                    />
                    <button onClick={() => checkAuthUser(inputLogin, inputPassword)}>Войти в аккаунт</button>
                </div>

                <p
                    className='form__little-description-form'
                    onClick={() => typeForm('reg')}
                >
                    Не зарегистрированы?
                </p>
            </div>
        </>
    );
}

export { LoginForm };
