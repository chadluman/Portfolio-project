function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className="mt-4 w-full max-w-md rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700">
      {message}
    </div>
  )
}

export default ErrorMessage
