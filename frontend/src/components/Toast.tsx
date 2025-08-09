import { useEffect } from 'react'

type Props = { message: string; onClose: () => void }
export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
      {message}
    </div>
  )
}
