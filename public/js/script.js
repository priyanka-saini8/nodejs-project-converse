let personName;
const extDiv = document.querySelector(".extdiv");

do {
    personName = prompt("Kindly enter your name!");
}while(!personName);

appendMessage("You have joined the chat", 'conn_dis');

const socket = io();
socket.emit('conn_dis', personName);

socket.on('con_dis_name_count', (name, count, con_type) => {
    if(con_type === true) appendMessage(`${name} have joined the chat`, 'conn_dis');
    else if(con_type === false) appendMessage(`${name} have left the chat`, 'conn_dis');
    scrollToBottom();
});

const btn = document.getElementById("send-btn");

btn.addEventListener("click", function() {
    let text = document.getElementById("textarea");
    if(text.value) sendMessage(text.value);
    text.value = "";
});

function sendMessage(msgg) {
    let msg = {
        user: personName,
        messgae: msgg.trim()
    };
    appendMessage(msg, 'o-message');
    scrollToBottom();
    //Sending to server using Socket
    socket.emit('message', msg)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'i-message');
    scrollToBottom();
});

function appendMessage(msg, type) {
    if(type === "o-message") {
        let outMessage = document.createElement('div');
        let classname = type;
        outMessage.classList.add(classname);
        outMessage.innerHTML = `<p class = "client-name">${msg.user}</p>
        <label>${msg.messgae}</label>`;
        extDiv.appendChild(outMessage);
    }
    if(type === "i-message") {
        let outMessage = document.createElement('div');
        let classname = type;
        outMessage.classList.add(classname);
        outMessage.innerHTML = `<p class = "client-name">${msg.user}</p>
        <labeL>${msg.messgae}</labeL>`;
        extDiv.appendChild(outMessage);
    }
    if(type == "conn_dis") {
        let message = document.createElement('label');
        message.classList.add(type);
        message.innerHTML = msg;
        extDiv.appendChild(message);
    }
    
}

function scrollToBottom() {
    extDiv.scrollTop = extDiv.scrollHeight;
}
