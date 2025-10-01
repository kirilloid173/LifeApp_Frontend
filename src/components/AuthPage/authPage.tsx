import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './style.scss';
import { usePopupRegStore } from '../../stores/popupReg';
import { useTypeFormStore } from '../../stores/typeForm';
import { useStatusAuthStore } from '../../stores/statusAuth';
import { useTriggerCheckAuthStore } from '../../stores/triggerCheckAuth';
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

    const changeTriggerAuthStore = useTriggerCheckAuthStore(
        (state) => state.changeValue
    );

    const valueTriggerAuthStore = useTriggerCheckAuthStore(
        (state) => state.value
    );

    const getInChatApp = () => {
        changeAuthStatus('isAuth');
        changeTriggerAuthStore(valueTriggerAuthStore + 1);
    };

    if (typeForm === 'reg')
        return (
            <>
                {statusPopup !== 'turnOff' && statusPopup === 'successReg' ? (
                    <div className='popup'>
                        <p>
                            Вы успешно зарегистрировались!
                            <br /> Добро пожаловать в LifeApp
                        </p>
                        <button onClick={getInChatApp}>Войти в чат</button>
                    </div>
                ) : null}
                <div
                    className={`reg-page ${
                        statusPopup !== 'turnOff' ? 'reg-page__dark' : ''
                    }`}
                >
                    <RegistrationForm />
                </div>
            </>
        );

    if (typeForm === 'login') return <LoginForm />;
}
