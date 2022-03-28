const date = new Date();
// All the garbeldegook is to prefix single-digit days and months with a 0
const today = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(
  -2
)}-${('0' + date.getDate()).slice(-2)}`;

module.exports = today;
