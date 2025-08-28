type TypesCheck = 'login' | 'password';

function validateInput(inputData: string, typeCheck: TypesCheck): boolean {
    inputData = inputData.trim();

    if (typeof inputData !== 'string') {
        return false;
    }

    if (typeCheck === 'login') {
        if (!inputData.trim()) return false;
        if (!/^[A-Za-z]+$/.test(inputData)) return false;
        if (!(inputData.length >= 1 && inputData.length <= 30)) return false;
        return true;
    }

    if (typeCheck === 'password') {
        if (!inputData.trim()) return false;
        if (!(inputData.length >= 1 && inputData.length <= 128)) return false;
        return true;
    }
    return false;
}

export default validateInput;
