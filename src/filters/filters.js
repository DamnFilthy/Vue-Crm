export default {
  dateFormat(date) {
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    let thisDate = new Date(date)
    return thisDate.toLocaleDateString('ru-RU', options)
  },
}
