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

export const loadVideo = (url, startTime = 0) => {
    const videoContainer = document.querySelector("#videoContainer");

    videoContainer.innerHTML = '';

    videoId = getIdFromUrl(url);

    if (videoId) {
        videoContainer.innerHTML = `
            <div id="player"></div>
        `;

        loadYouTubePlayer(videoId, startTime);
    } else {
        videoContainer.innerHTML = "<p>Link de vídeo inválido.</p>";
    }
};