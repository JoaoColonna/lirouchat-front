import { NextApiRequest, NextApiResponse } from 'next';
import { mdToPdf } from 'md-to-pdf';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { conversationId, conversation } = req.body;

    // Construindo o conteúdo em Markdown.
    let markdownContent = "# Conversa\n\n";
    for (const msg of conversation) {
      const sender = msg.role === "user" ? "User" : "Lirouchat";
      markdownContent += `**${sender}:** ${msg.parts}\n\n`;
    }

    // Gerando o PDF.
    const outputPath = path.join(process.cwd(), `conversa_${conversationId}.pdf`);
    const pdf = await mdToPdf({ content: markdownContent });
    fs.writeFileSync(outputPath, pdf.content);

    // Lendo o arquivo gerado.
    const fileBuffer = fs.readFileSync(outputPath);

    // Configurando a resposta.
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="conversa_${conversationId}.pdf"`);
    res.status(200).send(fileBuffer);

    // Removendo o arquivo temporário.
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
