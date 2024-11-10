import { YoutubeTranscript } from 'youtube-transcript';

export const getTranscriptFromId = async (videoId) => {

    var transcriptText = "";

    var transcript = await YoutubeTranscript.fetchTranscript(videoId);
    for (let i = 0; i < transcript.length; i++) {
        var textoAtual = transcript[i].text;
        textoAtual = textoAtual.charAt(0).toUpperCase() + textoAtual.substring(1);
        transcriptText += " " + textoAtual;
        transcript[i].text = textoAtual;
    }
    return {
        text: transcriptText,
        transcript
    }
}