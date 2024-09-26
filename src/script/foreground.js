if (typeof window !== null) {
   window.onload = () => {
      const id = setInterval(async () => {
         if (document.querySelector(".graph-before-activity-overview")) {
            clearInterval(id);
            let { value: defaultValue } = await chrome.storage.sync.get("value");
            defaultValue = defaultValue ?? "#1f6feb";
            mercimek(hexToRgb(defaultValue));
         }
      }, 100);
   };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.value) {
      mercimek(message.value);
   }
});

function mercimek(value = "255, 214, 0") {
   const pointsEl = document.querySelector(".graph-before-activity-overview").style;
   pointsEl.setProperty("--color-calendar-graph-day-L1-bg", `rgba(${value}, 0.25)`);
   pointsEl.setProperty("--color-calendar-graph-day-L2-bg", `rgba(${value}, 0.5)`);
   pointsEl.setProperty("--color-calendar-graph-day-L3-bg", `rgba(${value}, 0.75)`);
   pointsEl.setProperty("--color-calendar-graph-day-L4-bg", `rgba(${value}, 1)`);

   const graphEl = document.querySelector(".js-activity-overview-graph-container");
   graphEl.style.setProperty("--color-calendar-graph-day-L4-bg", `rgba(${value}, 1)`);

   graphEl.querySelector(".js-highlight-blob").style.fill = `rgba(${value}, 1)`;
   graphEl.querySelector(".js-highlight-blob").style.stroke = `rgba(${value}, 1)`;
   graphPath.style.backgroundColor = "red !important";
}

function hexToRgb(value) {
   const r = parseInt(value.substr(1, 2), 16);
   const g = parseInt(value.substr(3, 2), 16);
   const b = parseInt(value.substr(5, 2), 16);

   return `${r}, ${g}, ${b}`;
}
