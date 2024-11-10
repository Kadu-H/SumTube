import {loadYouTubePlayer} from './youtube-api.js';

export const getIdFromUrl = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export const loadVideo = (startTime = 0) => {
    const videoContainer = document.querySelector("#videoContainer");

    if (!onVideo) {
        videoContainer.innerHTML = '';
    }
    
    if (videoId) {
        if (!onVideo) {
            videoContainer.innerHTML = `
            <div id="player"></div>
            `;
        }
        loadYouTubePlayer(startTime);
    } else {
        videoContainer.innerHTML = "<p>Link de vídeo inválido.</p>";
    }
};