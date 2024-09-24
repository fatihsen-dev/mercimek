const input = document.querySelector("#input");
const inputLabel = document.querySelector("#inputLabel");

if (typeof window !== null) {
    window.onload = () => {
        const value = hexToRgb(input.value);
        inputLabel.style.background = `rgba(${value},1)`;
        inputLabel.innerHTML = `rgba(${value},1)`;
        send({
            value,
        });

        input.addEventListener("input", (e) => {
            const value = hexToRgb(e.target.value);
            inputLabel.style.background = `rgba(${value},1)`;
            inputLabel.innerHTML = `rgba(${value},1)`;
            send({
                value,
            });
        });
    };
}

async function send(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    await chrome.tabs.sendMessage(tab.id, message);
}

function hexToRgb(value) {
    const r = parseInt(value.substr(1, 2), 16);
    const g = parseInt(value.substr(3, 2), 16);
    const b = parseInt(value.substr(5, 2), 16);

    return `${r}, ${g}, ${b}`;
}
