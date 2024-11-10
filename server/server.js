import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unlink } from 'fs/promises';
import markdownpdf from 'markdown-pdf';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(cors());

const inicializeAI = () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    return model;
}

const getTranscriptFromId = async (videoUrl) => {

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

const getMarkdownAI = async (resumo, legenda, titulo) => {
    const prompt =
        `Gere apenas um texto grande no formato markdown bem elaborado e detalhado sobre os conteudos que foi retirado de um video com um titulo de "${titulo}", abaixo está a legenda do video e o resumo, não fale mais nada alem de gerar o texto em markdown, lembre-se que esse markdown vai ser transformado em pdf futuramente!
    Legenda Video: "${legenda}"
    Resumo do Video: "${resumo}"
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

const getSummaryAI = async (transcriptText) => {
    const prompt =
        `Gere apenas um resumo um pouco aprofundado e bem elaborado sobre o conteudo que foi retirado de um video aqui abaixo, não fale mais nada alem de gerar o resumo!
    Video: "${transcriptText}"
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

const sanitizeFileName = (fileName) => {
    const invalidChars = /[\/\\:*?"<>|!]/g;
    return fileName.replace(invalidChars, '');
}

const model = inicializeAI();

app.post('/', async (req, res) => {
    console.log(req.body)
    const { text, transcript } = await getTranscriptFromId(req.body.videoId);
    const summary = await getSummaryAI(text);
    const responseJson = {
        summary,
        transcript
    }
    return res.json(responseJson);
})

app.post('/pdf', async (req, res) => {
    const { resumo, legenda, titulo } = req.body;
    const markdown = await getMarkdownAI(resumo, legenda, titulo);
    const filePath = path.join(__dirname, `../temp/${sanitizeFileName(titulo)}.pdf`)
    markdownpdf()
        .from.string(markdown)
        .to(filePath, async () => { // Usando async dentro do callback
            res.download(filePath, `${titulo}.pdf`, async (err) => {
                if (err) {
                    console.error('Erro ao fazer o download do PDF:', err);
                } else {
                    console.log(`PDF gerado com sucesso`);
                    // Apaga o arquivo após o download
                    await unlink(filePath);
                    console.log(`Arquivo ${filePath} deletado com sucesso`);
                }
            });
        })
});

app.listen(3000, console.log("Backend do SumTube rodando em http://localhost:3000"));