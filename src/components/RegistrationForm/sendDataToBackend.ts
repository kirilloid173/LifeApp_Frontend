import { usePopupRegStore } from '../../stores/popupReg';

async function sendDataToBackend(
    statusValidateLogin: boolean,
    statusValidatePassword: boolean,
    loginInput: string,
    passwordInput: string
) {
    if (statusValidateLogin && statusValidatePassword) {
        const { changeStatusPopup } = usePopupRegStore.getState();

        const result = await fetch('api/regNewUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                loginUser: loginInput,
                passwordInputUser: passwordInput,
            }),
        });

        const data = await result.json();

        if (data.statusCreated && data.error === false) {
            changeStatusPopup('successReg');
            return 0;
        } else if (
            !data.statusCreated &&
            data.error &&
            data.typeError === 'already_exist'
        ) {
            return 409; //already_exist
        }
        return 404;
    }
    return 404;
}

export default sendDataToBackend;
