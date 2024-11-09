import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const inicializeAI = () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    return model;
}

const getTranscriptFromId = async(videoUrl) => {
    
    var transcriptText = "";
    
    var transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
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
    ;
}

const getSummaryAI = async(transcriptText) => {
    const prompt = 
    `Gere apenas um resumo um pouco aprofundado e bem elaborado sobre o conteudo que foi retirado de um video aqui abaixo, não fale mais nada alem de gerar o resumo!
    Video: "${transcriptText}"`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}

const model = inicializeAI();

app.post('/', async (req, res) => {
    console.log(req.body)
    const {text, transcript} = await getTranscriptFromId(req.body.videoId);
    const summary = await getSummaryAI(text);
    console.log(transcript);
    const responseJson = {
        summary,
        transcript
    }
    return res.json(responseJson);
})

app.listen(3000, console.log("Backend do SumTube rodando em http://localhost:3000"));