function validateInput(inputLogin: string): boolean {
    inputLogin = inputLogin.trim();

    if (!inputLogin.trim()) return false;
    if (!(inputLogin.length >= 1 && inputLogin.length <= 20)) return false;
    return true;
}

export default validateInput;
