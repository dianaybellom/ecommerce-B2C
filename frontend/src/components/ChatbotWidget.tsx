import React, { useState, useEffect, useRef } from "react"
import { MessageSquare, Sparkles, Minus, SendHorizontal } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL

const ChatbotWidget = () => {
  const [mensaje, setMensaje] = useState("")
  const [conversacion, setConversacion] = useState([])
  const [visible, setVisible] = useState(false)
  const chatContainerRef = useRef(null)

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return

    const nuevoChat = [...conversacion, { from: "usuario", text: mensaje }]
    setConversacion(nuevoChat)
    setMensaje("")

    const res = await fetch(`${API_URL}/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ mensaje }),
    })

    const data = await res.json()
    setConversacion([...nuevoChat, { from: "bot", text: data.respuesta }])
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [conversacion])

  return (
    <>
      {!visible && (
        <button
        onClick={() => setVisible(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#7f2d51] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <MessageSquare className="absolute" size={26} />
        <Sparkles className="absolute ml-6 mb-6" size={18} />
      </button>      
      )}

      {visible && (
        <div className="fixed bottom-6 right-6 w-[360px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col animate-fadeIn">
          <div className="bg-gradient-to-r from-[#7f2d51] to-[#a64b71] text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Asistente Virtual</span>
            <button onClick={() => setVisible(false)}>
              <Minus size={20} />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80 custom-scrollbar"
          >
            {conversacion.map((msg, i) => (
              <div
                key={i}
                className={`py-2 px-3 rounded-xl shadow ${
                  msg.from === "usuario"
                    ? "bg-[#d7b2c3] text-right ml-auto max-w-[80%]"
                    : "bg-[#f4e8ee] text-left mr-auto max-w-[80%]"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="border-t flex items-center p-2 bg-gray-50">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="flex-1 border-none rounded-lg px-3 py-2 outline-none bg-white shadow-inner"
              placeholder="Escribe tu pregunta..."
              onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            />
            <button
              onClick={enviarMensaje}
              className="ml-2 bg-[#7f2d51] text-white px-3 py-2 rounded-lg shadow hover:bg-[#9c3a6b]"
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatbotWidget
