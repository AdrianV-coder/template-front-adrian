import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createComment } from '../services/apiService';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store/index';

interface CreateCommentProps {
  postId: string;
  onCommentCreated?: () => void;
}

function CreateCommentPage({ postId, onCommentCreated }: CreateCommentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isActive, setIsActive] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendComment = async () => {
    if (!commentText.trim() || !user) return;
    setSending(true);
    try {
      await createComment({
        userId: user.id,
        postId,
        name: user.username,
        email: user.email,
        body: commentText
      });

      setCommentText('');
      setIsActive(false);

      if (onCommentCreated) onCommentCreated();

      alert('Comentario creado con éxito');
    } catch {
      alert('Error al crear el comentario');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {isActive ? (
        <div className="space-y-3">
          <textarea
            placeholder="Escribe tu comentario..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsActive(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
              disabled={sending}
            >
              Cancelar
            </button>
            <button
              onClick={handleSendComment}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white transition"
              disabled={sending}
            >
              {sending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5" />
                  Enviar
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => setIsActive(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-white transition duration-300 ease-in-out"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Crear Comentario
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateCommentPage;
