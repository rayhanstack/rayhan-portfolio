<template>
  <div class="chatbot-root">
    <!-- Floating toggle button -->
    <button
      class="chat-fab"
      :class="{ active: isOpen }"
      @click="toggleChat"
      :aria-label="isOpen ? 'Close chat assistant' : 'Open chat assistant'"
      aria-haspopup="dialog"
    >
      <MessageCircle v-if="!isOpen" :size="24" />
      <X v-else :size="22" />
      <span v-if="!isOpen" class="fab-pulse"></span>
    </button>

    <!-- Chat panel -->
    <Transition name="chat-pop">
      <div
        v-if="isOpen"
        class="chat-panel glass-card"
        role="dialog"
        aria-label="Chat with the AI assistant"
      >
        <header class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <Bot :size="18" />
            </div>
            <div>
              <p class="chat-title">Ask about {{ personal.name }}</p>
              <p class="chat-subtitle"><span class="status-dot"></span> AI Assistant</p>
            </div>
          </div>
          <button class="chat-close" @click="closeChat" aria-label="Close chat">
            <X :size="18" />
          </button>
        </header>

        <div class="chat-body" ref="scrollRef">
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['chat-msg', msg.role === 'user' ? 'msg-user' : 'msg-bot']"
          >
            <div v-if="msg.role === 'bot'" class="msg-avatar"><Bot :size="14" /></div>
            <div v-if="msg.role === 'bot'" class="msg-bubble" v-html="formatText(msg.text)"></div>
            <div v-else class="msg-bubble">{{ msg.text }}</div>
          </div>

          <div v-if="isTyping" class="chat-msg msg-bot">
            <div class="msg-avatar"><Bot :size="14" /></div>
            <div class="msg-bubble typing-bubble">
              <span></span><span></span><span></span>
            </div>
          </div>

          <div v-if="messages.length <= 1 && !isTyping" class="quick-questions">
            <button
              v-for="q in quickQuestions"
              :key="q"
              class="quick-chip"
              @click="handleQuickQuestion(q)"
            >
              {{ q }}
            </button>
          </div>
        </div>

        <form class="chat-composer" @submit.prevent="handleSubmit">
          <input
            v-model="draft"
            type="text"
            placeholder="Ask a question..."
            class="chat-input"
            :disabled="isTyping"
            autocomplete="off"
          />
          <button
            type="submit"
            class="chat-send"
            :disabled="!draft.trim() || isTyping"
            aria-label="Send message"
          >
            <Send :size="16" />
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MessageCircle, X, Send, Bot } from 'lucide-vue-next'
import { personal } from '@/data/portfolio'
import { useChatbot } from '@/composables/useChatbot'

const {
  isOpen,
  isTyping,
  messages,
  scrollRef,
  quickQuestions,
  toggleChat,
  closeChat,
  sendMessage,
} = useChatbot()

const draft = ref('')

function handleSubmit() {
  const text = draft.value
  draft.value = ''
  sendMessage(text)
}

function handleQuickQuestion(q) {
  sendMessage(q)
}

// Bot replies are generated locally (see chatbotEngine.js), never from raw
// user input, so escaping + a tiny markup pass for **bold** / newlines is safe.
function formatText(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')
}
</script>

<style scoped>
.chatbot-root {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

/* ─── Floating action button ────────────────────────────────────────── */
.chat-fab {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--gradient-hero);
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-glow);
  transition: transform var(--duration-base) var(--ease-spring);
  position: relative;
}
.chat-fab:hover { transform: translateY(-3px) scale(1.05); }
.chat-fab.active { transform: scale(0.95); }

.fab-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  opacity: 0.6;
  animation: fab-ping 2.4s ease-out infinite;
  pointer-events: none;
}
@keyframes fab-ping {
  0% { transform: scale(0.9); opacity: 0.6; }
  80% { transform: scale(1.4); opacity: 0; }
  100% { opacity: 0; }
}

/* ─── Panel ──────────────────────────────────────────────────────────── */
.chat-panel {
  position: absolute;
  bottom: 74px;
  right: 0;
  width: min(380px, calc(100vw - 32px));
  height: min(560px, calc(100vh - 140px));
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-panel);
  flex-shrink: 0;
}
.chat-header-info { display: flex; align-items: center; gap: 12px; }
.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-hero);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}
.chat-title { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }
.chat-subtitle {
  font-size: 0.72rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2ecc71;
  box-shadow: 0 0 6px #2ecc71;
}
.chat-close {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 8px;
  transition: color 200ms, background 200ms;
}
.chat-close:hover { color: var(--text-primary); background: var(--accent-dim); }

/* ─── Body / messages ───────────────────────────────────────────────── */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-secondary);
}

.chat-msg { display: flex; gap: 8px; max-width: 88%; }
.msg-bot { align-self: flex-start; }
.msg-user { align-self: flex-end; flex-direction: row-reverse; }

.msg-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--accent-dim);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.msg-bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.85rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
.msg-bot .msg-bubble {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-top-left-radius: 4px;
}
.msg-user .msg-bubble {
  background: var(--accent);
  color: #fff;
  border-top-right-radius: 4px;
}

.typing-bubble { display: flex; gap: 4px; align-items: center; padding: 12px 14px; }
.typing-bubble span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: typing-bounce 1.2s infinite ease-in-out;
}
.typing-bubble span:nth-child(2) { animation-delay: 0.15s; }
.typing-bubble span:nth-child(3) { animation-delay: 0.3s; }
@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.quick-chip {
  background: var(--accent-dim);
  border: 1px solid var(--border);
  color: var(--accent);
  font-size: 0.78rem;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 200ms;
}
.quick-chip:hover { background: var(--accent); color: #fff; }

/* ─── Composer ───────────────────────────────────────────────────────── */
.chat-composer {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-panel);
  flex-shrink: 0;
}
.chat-input {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.85rem;
  color: var(--text-primary);
  outline: none;
  transition: border-color 200ms;
}
.chat-input:focus { border-color: var(--accent); }
.chat-input::placeholder { color: var(--text-muted); }

.chat-send {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--accent);
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms;
  flex-shrink: 0;
}
.chat-send:hover:not(:disabled) { background: var(--accent-light); transform: translateY(-1px); }
.chat-send:disabled { opacity: 0.4; cursor: not-allowed; }

/* ─── Transition ─────────────────────────────────────────────────────── */
.chat-pop-enter-active, .chat-pop-leave-active {
  transition: opacity 250ms var(--ease-smooth), transform 250ms var(--ease-smooth);
}
.chat-pop-enter-from, .chat-pop-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}
.chat-pop-enter-to, .chat-pop-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ─── Mobile ─────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .chatbot-root { bottom: 16px; right: 16px; }
  .chat-panel {
    width: calc(100vw - 24px);
    height: calc(100vh - 120px);
    right: -8px;
  }
  .chat-fab { width: 52px; height: 52px; }
}
</style>