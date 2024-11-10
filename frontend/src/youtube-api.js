export const loadYouTubePlayer = (startTime) => {
    if (window.YT) {
        player.loadVideoById(videoId, startTime);
        player.seekTo(0, true);
        player.playVideo();
        console.log(player)
    } else {
        const script = document.createElement('script');
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);

        window.onYouTubeIframeAPIReady = () => {
            console.log("teste");
            window.player = new YT.Player('player', {
                videoId,
                width: "100%",
                height: '230',
                events: {
                    'onReady': (event) => {
                        event.target.seekTo(startTime, true);
                        event.target.playVideo();
                    }
                }
            });
        };
    }
};
