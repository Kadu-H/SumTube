import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';


const inicializeAI = () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    return model;
}

const model = inicializeAI();

export const getMarkdownAI = async (resumo, legenda, titulo) => {
    const prompt =
    `Gere apenas um texto grande no formato markdown bem elaborado e detalhado sobre os conteudos que foi retirado de um video com um titulo de "${titulo}", abaixo está a legenda do video e o resumo, não fale mais nada alem de gerar o texto em markdown, lembre-se que esse markdown vai ser transformado em pdf futuramente!
    Legenda Video: "${legenda}"
    Resumo do Video: "${resumo}"
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export const getSummaryAI = async (transcriptText) => {
    const prompt =
    `Gere apenas um resumo um pouco aprofundado e bem elaborado sobre o conteudo que foi retirado de um video aqui abaixo, não fale mais nada alem de gerar o resumo!
    Video: "${transcriptText}"
    `;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
}