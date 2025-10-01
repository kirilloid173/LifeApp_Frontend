import { usePopupRegStore } from '../../stores/popupReg';

function sendDataToBackend(
    statusValidateLogin: boolean,
    statusValidatePassword: boolean,
    loginInput: string,
    passwordInput: string
) {
    if (statusValidateLogin && statusValidatePassword) {
        const { changeStatusPopup } = usePopupRegStore.getState();

        fetch('api/regNewUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                loginUser: loginInput,
                passwordInputUser: passwordInput,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.statusCreated && data.error === false) {
                    changeStatusPopup('successReg');
                }
            })
            .catch((error) => {
                console.log(
                    'Cannot connect to backend service, error -> ',
                    error
                );
            });
    }
}

export default sendDataToBackend;
