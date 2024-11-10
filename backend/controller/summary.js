import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unlink } from 'fs/promises';
import { mdToPdf } from 'md-to-pdf';

import { getTranscriptFromId } from '../model/transcript.js';
import { getSummaryAI, getMarkdownAI } from '../model/gemini.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sanitizeFileName = (fileName) => {
    const invalidChars = /[\/\\:*?"<>|!]/g;
    return fileName.replace(invalidChars, '');
}

export const getSummary = async (req, res) => {
    try {
        console.log(req.body)
        const { text, transcript } = await getTranscriptFromId(req.body.videoId);
        const summary = await getSummaryAI(text);
        const responseJson = {
            summary,
            transcript
        }
        return res.json(responseJson);
    } catch (error) {
        console.error(error);
        return res.redirect('/');
    }
}

export const generatePdf = async (req, res) => {
    const { resumo, legenda, titulo } = req.body;
    const markdown = await getMarkdownAI(resumo, legenda, titulo);
    const filePath = path.join(__dirname, `../../temp/${sanitizeFileName(titulo)}.pdf`);
    const pdf = await mdToPdf({ content: markdown }, { dest: filePath });
    if (pdf) {
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
    }
}