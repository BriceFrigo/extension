// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("L'extension SpeakAnime est installée.");
});

// Écoutez les messages provenant de la popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openAnimeSama") {
        chrome.tabs.create({ url: "https://www.anime-sama.com" });
    }
});
