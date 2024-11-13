# SumTube - Assistente de Revisão para Vídeo-Aulas

**SumTube** é uma ferramenta criada para ajudar estudantes a revisarem vídeo-aulas de maneira mais prática e eficiente, especialmente para o ENEM e outros exames. O projeto permite que os usuários insiram links de vídeos do YouTube, obtenham automaticamente a legenda sincronizada com o vídeo, e utilizem inteligência artificial para gerar resumos e identificar os principais tópicos, facilitando a revisão e organização do conteúdo de forma estruturada.

## Tecnologias Utilizadas

- **Node.js**: Base do backend da aplicação.
- **Express.js**: Estruturação e organização das rotas e API do backend.
- **Gemini (IA do Google)**: Utilizada para gerar resumos e identificar os tópicos mais importantes do vídeo.
- **youtube-transcript**: Biblioteca para obter as legendas dos vídeos do YouTube.
- **mdToPdf**: Geração de PDFs com arquivos MarkDown com resumos detalhados para facilitar a consulta offline.

## Funcionalidades

1. **Sincronização de Legenda com o Vídeo**:
   - A aplicação recebe o link de um vídeo do YouTube e, através da biblioteca `youtube-transcript`, gera a legenda sincronizada.

2. **Resumo Rápido com IA**:
   - Utilizando a IA Gemini do Google, o sistema cria um resumo simples do vídeo, proporcionando uma visão geral dos pontos mais importantes abordados.

3. **Geração de PDF**:
   - O sistema permite que o usuário baixe um resumo detalhado do vídeo em formato PDF. Este arquivo contém um resumo mais extenso e organizado com os tópicos mais importantes.

## Estrutura do Projeto

Este projeto foi criado com uma estrutura voltada para integrar o backend ao frontend de forma simplificada, aplciado com arquitetura MVC, utilizando métodos POST para facilitar a implementação de certas funcionalidades:

- **Backend**:
  - Estrutura baseada em **Express.js** com rotas POST para manipulação de dados e chamadas de API.
  - Integração com **youtube-transcript** para processamento de legendas.
  - Interação com a **IA Gemini** para geração de resumos.

- **Frontend**:
  - Interface simples para entrada do link do vídeo e sincronização com a legenda.
  - Interface com um resumo simples sobre o vídeo.
  - Opção de geração do PDF com o resumo detalhado.

## Como Utilizar

1. Clone este repositório:

   ```bash
   git clone https://github.com/Kadu-H/SumTube.git
   cd SumTube
   ```
2. Configure as variáveis de ambiente:
   Crie um arquivo .env dentro da pasta "backend" e coloque a sua chave de API nessa variavel:
   ```env
   API_KEY=sua-chave-de-api-gemini
   ```
3. Inicialize o Backend:
    ```bash
   cd backend
   npm install
   npm start
   ```
4. Inicialize o Frontend (Modo desenvolvedor):
    ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Endpoints

- **http://localhost:5000/** - Recebe o link do vídeo via POST e retorna um objeto de legenda do vídeo e uma string como resumo.

- **http://localhost:5000/pdf** - Gera e retorna o PDF com um resumo detalhado do vídeo.

## Exemplo de Uso

Após inicializar o servidor, basta acessar o frontend, inserir o link de um vídeo do YouTube e clicar para enviar url, vai sincronizar a legenda, onde o usuario pode se nortear, e ao mesmo tempo vai gerar um resumo simples, ao clicar em "Gerar PDF" vai fazer download de um PDF do vídeo, onde se o usuario não gostar é so ele gerar outro.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para aprimorar o projeto.
