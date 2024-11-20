export async function callPostAPI(endpoint, data) {
  let res = await fetch(import.meta.env.VITE__BACKEND_URL + endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  let json = await res.json()
  return json
}
