export const getAnswer = (operation, numbers) => {
  return fetch(`http://localhost:3001/${operation}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "numbers": numbers
    })
  })
  .then(response => response.json())
}
