const getIdFromUrl = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null;

const loadVideo = (url) => {
    const videoContainer = document.querySelector("#videoContainer");
    videoContainer.innerHTML = "";
    window.YTPlayer = new YT.Player('videoContainer', {
        videoId: loadVideo(url),
    });
}