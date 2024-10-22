document.addEventListener('DOMContentLoaded', () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let isRecognizing = false; // Indicateur d'état

        // Function to start recognition
        const startRecognition = () => {
            recognition.start();
            console.log('En écoute...');
            isRecognizing = true; // Met à jour l'état
        };

        // Start the recognition for the first time
        startRecognition();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            console.log(`Vous avez dit : ${speechResult}`);
            if (speechResult.toLowerCase().includes('animé sama')) {
                window.open('https://anime-sama.fr/', '_blank');
            } else {
                console.log("Commande non reconnue.");
            }
        };

        recognition.onerror = (event) => {
            console.error(`Erreur : ${event.error}`);
            if (event.error === 'not-allowed') {
                console.error("Accès au microphone refusé. Vérifiez les permissions.");
            } else if (event.error === 'aborted') {
                console.error("La reconnaissance a été arrêtée. Tentative de redémarrage...");
                startRecognition(); // Restart recognition
            } else {
                console.error("Une autre erreur s'est produite : ", event.error);
            }
        };

        recognition.onend = () => {
            console.log("La reconnaissance a été arrêtée.");
            isRecognizing = false; // Réinitialise l'état lorsque la reconnaissance se termine
            // Redémarrer la reconnaissance automatiquement
            startRecognition(); // Restart recognition
            console.log('En écoute de nouveau...'); // Indique que la reconnaissance a recommencé
        };
    } else {
        console.error("L'API Web Speech n'est pas supportée par votre navigateur.");
    }
});
