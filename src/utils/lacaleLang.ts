export function getLang() {
  console.log(navigator.languages)

  return navigator.languages[0]
}
