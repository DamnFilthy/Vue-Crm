export function validName(name) {
  let validNamePattern = new RegExp("^([а-яёА-ЯЁ]+|[a-zA-Z]+)(?:[-'\\s]|[а-яёА-ЯЁ]+|[a-zA-Z]+)*$")
  return validNamePattern.test(name)
}

export function requiredField(value) {
  return value !== null && value !== undefined && value.trim() !== ''
}

export function confirmPasswordField(password1, password2) {
  return password1 === password2
}

export function validLimit(value) {
  return Number(value) > 0 && Number(value[0]) !== 0
}
