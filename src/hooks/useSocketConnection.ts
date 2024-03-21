import { useEffect, useState } from 'react'
import socketIO, { Socket } from 'socket.io-client'

const useSocketConnection = () => {
  const [io, setIo] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = socketIO('https://whale-socket.up.railway.app')
    setIo(socket)

    // Clean up function to disconnect socket when component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  return io
}

export default useSocketConnection
