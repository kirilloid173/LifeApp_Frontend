function sendDataToBackend(
    statusValidateLogin: boolean,
    statusValidatePassword: boolean,
    loginInput: string,
    passwordInput: string
) {
    if (statusValidateLogin && statusValidatePassword) {
        fetch('http://127.0.0.1:3000/regNewUser', {
            method: 'POST',
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
                console.log(data);
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
