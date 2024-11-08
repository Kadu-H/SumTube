const getIdFromUrl = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const loadVideo = (url) => {
    const videoContainer = document.querySelector("#videoContainer");

    // Limpa o conteúdo atual do container
    videoContainer.innerHTML = '';

    const videoId = getIdFromUrl(url);

    // Verifica se o ID do vídeo foi encontrado
    if (videoId) {
        videoContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
    } else {
        videoContainer.innerHTML = "<p>Link de vídeo inválido.</p>";
    }
};
