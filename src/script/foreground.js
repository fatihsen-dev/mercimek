if (typeof window !== null) {
    window.onload = () => {
        const id = setInterval(async () => {
            if (document.querySelector(".graph-before-activity-overview")) {
                clearInterval(id);
                const { value } = await chrome.storage.sync.get("value");
                mercimek(value);
            }
        }, 100);
    };
}

function mercimek(value = "255, 214, 0") {
    const el = document.querySelector(".graph-before-activity-overview").style;
    el.setProperty("--color-calendar-graph-day-L1-bg", `rgba(${value}, 0.25)`);
    el.setProperty("--color-calendar-graph-day-L2-bg", `rgba(${value}, 0.5)`);
    el.setProperty("--color-calendar-graph-day-L3-bg", `rgba(${value}, 0.75)`);
    el.setProperty("--color-calendar-graph-day-L4-bg", `rgba(${value}, 1)`);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.value) {
        mercimek(message.value);
    }
});
