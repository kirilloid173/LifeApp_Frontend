import validateInput from '../../lib/validate';

function checkAuthUser(loginInput: string, passwordInput: string): void {
    if (
        validateInput(loginInput, 'login') &&
        validateInput(passwordInput, 'password')
    ) {
        fetch('api/checkLoginForm', {
            method: 'POST',
            credentials: 'include',
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
                console.log('Success Auth');
            } else {
                //Not Auth
                console.log('Not success Auth');
            }
        });
    }
}

export { checkAuthUser };
