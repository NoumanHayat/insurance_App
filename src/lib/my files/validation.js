export const doesStringContainPattern = (string, pattern) => {
    const regExp = new RegExp(pattern);
    return regExp.test(string);
}