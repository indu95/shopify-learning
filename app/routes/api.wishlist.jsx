import { json } from '@remix-run/node'

export async function loader() {
  return json({
    success: 'true',
    messsage: 'API call is success!!!'
  })
}

export async function action({ request }) {
  // updates persistent data
  let method = request.method
  switch (method) {
    case 'POST':
      return json({ message: 'success post call' })
    case 'PATCH':
      return json({ message: 'success patch call' })
    default:
      return new Response('method not allowed', { status: 405 })
  }
}
