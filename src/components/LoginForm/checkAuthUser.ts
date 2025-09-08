import validateInput from '../../lib/validate';

type AuthStatus = 'unknown' | 'isAuth' | 'notIsAuth' | 'errorConnection';

function checkAuthUser(
    loginInput: string,
    passwordInput: string,
    statusAuthStore: (status: AuthStatus) => void
): void {
    console.log(typeof statusAuthStore);
    if (
        validateInput(loginInput, 'login') &&
        validateInput(passwordInput, 'password')
    ) {
        fetch('api/checkLoginForm', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                login: loginInput,
                password: passwordInput,
            }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok && data.tokenCreated) {
                // Success Auth
                statusAuthStore('isAuth');
            } else {
                //Not Auth
                statusAuthStore('notIsAuth');
            }
        });
    }
}

export { checkAuthUser };
