const messages = document.getElementById('messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const suggestions = document.getElementById('suggestions');
const resetBtn = document.getElementById('reset');

let sessionId = localStorage.getItem('dismissal_session_id');

function addMessage(text, who='bot') {
  const el = document.createElement('div');
  el.className = `message ${who}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function setSuggestions(items=[]) {
  suggestions.innerHTML = '';
  items.forEach(item => {
    const button = document.createElement('button');
    button.className = 'suggestion';
    button.type = 'button';
    button.textContent = item;
    button.onclick = () => send(item);
    suggestions.appendChild(button);
  });
}

async function send(text) {
  const value = (text || input.value).trim();
  if (!value) return;
  input.value = '';
  addMessage(value, 'user');
  setSuggestions([]);
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({session_id: sessionId, message: value})
  });
  const data = await response.json();
  sessionId = data.session_id;
  localStorage.setItem('dismissal_session_id', sessionId);
  addMessage(data.text, 'bot');
  setSuggestions(data.options || []);
}

form.addEventListener('submit', (e) => { e.preventDefault(); send(); });

resetBtn.onclick = async () => {
  if (sessionId) {
    await fetch('/api/reset', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({session_id: sessionId})
    });
  }
  messages.innerHTML = '';
  setSuggestions([]);
  addMessage('Здравствуйте! Я помогу с вопросами по увольнению. Напишите, что вам нужно сделать.');
  input.focus();
};

addMessage('Здравствуйте! Я помогу с вопросами по увольнению. Напишите, что вам нужно сделать.');
setSuggestions(['Как оформить увольнение?', 'Какие документы нужны?', 'Хочу оформить обращение']);
input.focus();
