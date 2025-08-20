function validateReg(inputReg: string): boolean {
    inputReg = inputReg.trim();
    if (inputReg.trim()) {
        if (inputReg.length >= 1 && inputReg.length <= 20) {
            if (/^[a-zA-Z0-9_-]+$/.test(inputReg)) {
                return true;
            }
        }
    }
    return false;
}

export { validateReg };
