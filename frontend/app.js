console.log("SocialMini frontend działa");

// Tu później:
// - obsługa formularzy logowania/rejestracji
// - wysyłanie zapytań do backendu (fetch)
// - renderowanie postów z API

const API_URL = "http://localhost:5000/api";
let currentRoomId = null;

// Logowanie
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Zalogowano!");
        loadPosts();
    } else {
        alert("Błąd logowania");
    }
});

async function loadPosts() {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    const list = document.getElementById("posts-list");
    list.innerHTML = "";

    posts.forEach(post => {
        const el = document.createElement("article");
        el.className = "post card";
        el.innerHTML = `
            <div class="post-header">
                <span class="post-author">${post.author?.username || "Anon"}</span>
                <span class="post-date">${new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <button onclick="likePost('${post._id}')">👍 ${post.likes}</button>
            </div>
        `;
        list.appendChild(el);
    });
}

loadPosts();

document.getElementById("new-post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Musisz być zalogowany!");

    const content = e.target.content.value;

    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ content })
    });

    const data = await res.json();

    if (data.message) {
        e.target.reset();
        loadPosts();
    }
});

async function likePost(id) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Musisz być zalogowany!");

    await fetch(`${API_URL}/posts/${id}/like`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    loadPosts();
}
async function loadRooms() {
    const res = await fetch(`${API_URL}/rooms`);
    const rooms = await res.json();

    const list = document.getElementById("rooms-list");
    list.innerHTML = "";

    rooms.forEach(room => {
        const li = document.createElement("li");
        li.textContent = room.name;
        li.onclick = () => enterRoom(room._id, room.name);
        list.appendChild(li);
    });
}

loadRooms();
function enterRoom(id, name) {
    currentRoomId = id;
    document.getElementById("current-room-name").textContent = name;
    document.getElementById("chat-form").style.display = "flex";
    loadMessages();
}
async function loadMessages() {
    if (!currentRoomId) return;

    const res = await fetch(`${API_URL}/rooms/${currentRoomId}/messages`);
    const msgs = await res.json();

    const box = document.getElementById("chat-messages");
    box.innerHTML = "";

    msgs.forEach(msg => {
        const div = document.createElement("div");
        div.className = "chat-message";
        div.innerHTML = `
            <span class="author">${msg.author.username}:</span>
            <span>${msg.content}</span>
        `;
        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}

setInterval(loadMessages, 2000);

document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Musisz być zalogowany!");

    const content = document.getElementById("chat-input").value;

    await fetch(`${API_URL}/rooms/${currentRoomId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ content })
    });

    document.getElementById("chat-input").value = "";
    loadMessages();
});
