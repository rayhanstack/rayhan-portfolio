import { ref, nextTick } from 'vue'
import { personal } from '@/data/portfolio'
import { getBotReply, quickQuestions } from '@/utils/chatbotEngine'

let idCounter = 0
function nextId() {
  idCounter += 1
  return idCounter
}

export function useChatbot() {
  const isOpen = ref(false)
  const isTyping = ref(false)
  const hasGreeted = ref(false)
  const messages = ref([])
  const scrollRef = ref(null)

  function scrollToBottom() {
    nextTick(() => {
      if (scrollRef.value) {
        scrollRef.value.scrollTop = scrollRef.value.scrollHeight
      }
    })
  }

  function greet() {
    if (hasGreeted.value) return
    hasGreeted.value = true
    messages.value.push({
      id: nextId(),
      role: 'bot',
      text: `Hi! 👋 I'm ${personal.name}'s AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch.`,
    })
    scrollToBottom()
  }

  function toggleChat() {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      greet()
      scrollToBottom()
    }
  }

  function closeChat() {
    isOpen.value = false
  }

  function pushUserMessage(text) {
    messages.value.push({ id: nextId(), role: 'user', text })
    scrollToBottom()
  }

  function pushBotMessage(text) {
    messages.value.push({ id: nextId(), role: 'bot', text })
    scrollToBottom()
  }

  function sendMessage(rawText) {
    const text = rawText.trim()
    if (!text || isTyping.value) return

    pushUserMessage(text)
    isTyping.value = true

    const delay = 450 + Math.random() * 500
    setTimeout(() => {
      const reply = getBotReply(text)
      isTyping.value = false
      pushBotMessage(reply)
    }, delay)
  }

  return {
    isOpen,
    isTyping,
    messages,
    scrollRef,
    quickQuestions,
    toggleChat,
    closeChat,
    sendMessage,
  }
}