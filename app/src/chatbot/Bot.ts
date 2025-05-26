// src/chatbot/Bot.ts
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import type { Question } from './Questions';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const storagePath = path.join(__dirname, '../storage/forms.json');

export async function runBot(questions: Question[]) {
  const answers: Record<string, string> = {};

  for (const question of questions) {
    await new Promise<void>((resolve) => {
      rl.question(
        `${question.text}${question.options ? ' (' + question.options.join(', ') + ')' : ''}\n> `,
        (answer) => {
          answers[question.field] = answer;
          resolve();
        }
      );
    });
  }

  rl.close();

  // Leer archivo actual
  let existingForms: any[] = [];
  if (fs.existsSync(storagePath)) {
    const raw = fs.readFileSync(storagePath, 'utf-8');
    try {
      existingForms = JSON.parse(raw);
    } catch {
      existingForms = [];
    }
  }

  // Agregar nuevo formulario
  existingForms.push(answers);

  // Guardar de nuevo en el archivo
  fs.writeFileSync(storagePath, JSON.stringify(existingForms, null, 2), 'utf-8');

  console.log('\n✅ Formulario guardado exitosamente.');
}
