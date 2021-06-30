function usersClassicEntryValidation (value) {
  const regex = /^[a-z\d\-_""çéàèöôïë\s]+$/i
  if (!value.match(regex)) {
    throw new Error(
      'Les caractères spéciaux ne sont pas acceptés !'
    )
  }
}

function usersImagesEntryValidation (value) {
  const regex = /(\.jpg|\.jpeg|\.gif|\.png)$/i
  if (!value.match(regex)) {
    throw new Error(
      'Vous ne pouvez utiliser que les formats gif, jpg, jpeg et png'
    )
  }
}

function usersTextEntryValidation (value) {
  const regex = /^[a-z0-9-\d\-_.!?#*()"":;,'=+$€£@&çéöôàèïë\s]+$/i
  if (!value.match(regex) && value != '') {
    throw new Error(
      'Certains caractères spéciaux ne sont pas acceptés !'
    )
  }
}

module.exports = {
  usersClassicEntryValidation,
  usersImagesEntryValidation,
  usersTextEntryValidation
}