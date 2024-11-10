var videoId;
var legenda;
var resumo;
var onVideo = false;
var player;

function clickLegenda(button) {
    var offset = button.getAttribute('offset');
    offset = parseFloat(offset);
    player.seekTo(offset);
}
setInterval(slideScrollLegenda, 250);

function slideScrollLegenda() {
    if (!onVideo) {
        return;
    }

    var playerState = player.getPlayerState();
    if (playerState == 2) {
        return;
    }

    var rows = document.querySelectorAll("#legendaRow");
    var videoTimeCurrent = player.getCurrentTime();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        const proxRow = rows[index + 1];

        var offsetAtual = parseFloat(row.getAttribute("offset"));

        if (proxRow) {
            var offsetProximo = parseFloat(proxRow.getAttribute("offset"));
            if (videoTimeCurrent >= offsetAtual && videoTimeCurrent < offsetProximo) {
                row.scrollIntoView({ behavior: "smooth" });
                break;
            }
        } else {
            if (videoTimeCurrent >= offsetAtual) {
                row.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
}