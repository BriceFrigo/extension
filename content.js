// content.js

// Créer un conteneur pour l'interface utilisateur
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.bottom = '20px';
container.style.right = '20px';
container.style.backgroundColor = '#fff';
container.style.border = '1px solid #ccc';
container.style.borderRadius = '5px';
container.style.padding = '10px';
container.style.zIndex = '10000';
container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
container.style.display = 'flex';
container.style.flexDirection = 'column';

// Ajouter un bouton pour démarrer la reconnaissance vocale
const startButton = document.createElement('button');
startButton.innerText = 'Démarrer la reconnaissance vocale';
startButton.style.backgroundColor = '#4CAF50';
startButton.style.color = '#fff';
startButton.style.border = 'none';
startButton.style.padding = '10px';
startButton.style.cursor = 'pointer';

// État de la reconnaissance vocale
let isRecognizing = false; // Indicateur d'état
let recognition; // Déclaration de la reconnaissance

 
// Fonction pour démarrer la reconnaissance vocale
const startRecognition = () => {
    if (isRecognizing) {
        console.log("La reconnaissance est déjà en cours.");
        return; // Ne démarre pas si déjà en cours
    }
    
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Ajout d'un try-catch pour attraper les erreurs de démarrage
    try {
        recognition.start();
        console.log('En écoute...'); // Indique que la reconnaissance a commencé
        isRecognizing = true; // Met à jour l'état
        status.innerText = "Dites quelque chose...";
    } catch (error) {
        console.error(`Erreur de démarrage : ${error.message}`);
        status.innerText = "Erreur de démarrage. Vérifiez les permissions.";
        return;
    }

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Vous avez dit : ${speechResult}`);
        if (speechResult.toLowerCase().includes('animé sama')) {
            window.open('https://anime-sama.fr/', '_blank');
        } else {
            status.innerText = "Commande non reconnue.";
        }
    };

    recognition.onerror = (event) => {
        console.error(`Erreur : ${event.error}`);
        if (event.error === 'not-allowed') {
            status.innerText = "Accès au microphone refusé. Vérifiez les permissions.";
        } else {
            status.innerText = "Une erreur s'est produite lors de la reconnaissance.";
        }
        isRecognizing = false; // Réinitialise l'état en cas d'erreur
    };

    recognition.onend = () => {
        console.log("La reconnaissance a été arrêtée.");
        isRecognizing = false; // Réinitialise l'état lorsque la reconnaissance se termine
        status.innerText = "Dites quelque chose !";
    };
};

// Événement pour démarrer la reconnaissance
startButton.addEventListener('click', startRecognition);

// Ajouter un statut
const status = document.createElement('p');
status.innerText = 'Appuyez sur le bouton pour parler...';
container.appendChild(startButton);
container.appendChild(status);

// Ajouter le conteneur au body
document.body.appendChild(container);
