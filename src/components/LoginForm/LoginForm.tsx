import { useTypeFormStore } from '../../stores/typeForm';

function LoginForm() {
    const typeForm = useTypeFormStore((state) => state.changeTypeForm);

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
                    />
                    <p>Введите ваш пароль</p>
                    <input
                        type='password'
                        id='password'
                        placeholder='Пароль'
                        maxLength={128}
                    />
                    <button>Войти в аккаунт</button>

                    {/* <p className='form__description-form-reg'>
                    Любой набор латинский букв или цифр
                </p> */}
                </div>

                <p
                    className='form__little-description-form'
                    onClick={() => typeForm('reg')}
                >
                    Не зарегистрированы?
                </p>

                {/* <p className='form__little-description-form'>
                Ещё не зарегистрированы?
            </p> */}
            </div>
        </>
    );
}

export { LoginForm };
