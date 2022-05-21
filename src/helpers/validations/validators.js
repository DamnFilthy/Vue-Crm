export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    return validNamePattern.test(name);
}

export function requiredField(value) {
    return value !== null && value !== undefined && value.trim() !== '';
}

export function confirmPasswordField(password1, password2) {
    return password1 === password2
}
