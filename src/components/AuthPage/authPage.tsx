import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './style.scss';
import { usePopupRegStore } from '../../stores/popupReg';
import { useTypeFormStore } from '../../stores/typeForm';
import { useStatusAuthStore } from '../../stores/statusAuth';
import { LoginForm } from '../LoginForm/LoginForm';
export default function AuthPage() {
    type TypesForm = 'reg' | 'login';
    type PopupStatus =
        | 'cannotConnectBackend'
        | 'UserIsExist'
        | 'successReg'
        | 'turnOff'; // turnOff = Not show popup

    const changeAuthStatus = useStatusAuthStore(
        (state) => state.changeStatusAuth
    );
    const typeForm = useTypeFormStore<TypesForm>((state) => state.typeForm);
    const statusPopup = usePopupRegStore<PopupStatus>(
        (state) => state.statusPopup
    );

    if (typeForm === 'reg')
        return (
            <>
                {statusPopup !== 'turnOff' && statusPopup === 'successReg' ? (
                    <div className='popup'>
                        <p>
                            Вы успешно зарегистрировались!
                            <br /> Добро пожаловать в LifeApp
                        </p>
                        <button onClick={() => changeAuthStatus('isAuth')}>
                            Войти в чат
                        </button>
                    </div>
                ) : null}
                <div
                    className={`reg-page ${
                        statusPopup !== 'turnOff' ? 'reg-page__dark' : ''
                    }`}
                >
                    {/*  */}
                    <RegistrationForm />
                </div>
            </>
        );

    if (typeForm === 'login') return <LoginForm />;
}
