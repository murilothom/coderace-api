import { QuestionDto } from '../dto/question-dto';

export function getThreeRandomQuestions(
  questions: QuestionDto[],
): QuestionDto[] {
  const randomQuestions: QuestionDto[] = [];

  const questionsCopy = [...questions];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * questionsCopy.length);

    randomQuestions.push(questionsCopy[randomIndex]);

    questionsCopy.splice(randomIndex, 1);
  }

  return randomQuestions;
}

export const questionsAfterWorkObjects = [
  {
    question: 'Quão cansado você se sente após o trabalho de hoje?',
    journey: 'fim',
  },
  {
    question: 'Quanto a tecnologia ajudou sua produtividade hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão satisfeito você está com o que conseguiu realizar hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão bem as ferramentas digitais funcionaram para você hoje?',
    journey: 'fim',
  },
  {
    question:
      'Quanto as distrações digitais impactaram sua produtividade hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão bem você conseguiu manter o foco nas suas tarefas?',
    journey: 'fim',
  },
  {
    question: 'Quão estressado você está após as interações digitais de hoje?',
    journey: 'fim',
  },
  {
    question:
      'Quão satisfeito você está com a comunicação virtual que teve hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão bem você se sentiu utilizando as tecnologias disponíveis?',
    journey: 'fim',
  },
  {
    question: 'Quão confiante você está em relação ao seu desempenho hoje?',
    journey: 'fim',
  },
  {
    question: 'Quanto a tecnologia atrapalhou seu trabalho hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão equilibrado você se sente após o expediente?',
    journey: 'fim',
  },
  {
    question:
      'Quanto você conseguiu se desconectar mentalmente do trabalho após o expediente?',
    journey: 'fim',
  },
  {
    question:
      'Quão satisfeito você está com a quantidade de trabalho que concluiu hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão bem você lidou com problemas técnicos hoje?',
    journey: 'fim',
  },
  {
    question:
      'Quão satisfeito você está com o suporte tecnológico recebido hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão bem você conseguiu evitar sobrecarga digital hoje?',
    journey: 'fim',
  },
  {
    question: 'Quão preparado você se sente para o dia de trabalho seguinte?',
    journey: 'fim',
  },
  {
    question:
      'Quão bem você conseguiu manter um bom relacionamento virtual com colegas?',
    journey: 'fim',
  },
  {
    question:
      'Quanto você conseguiu equilibrar demandas pessoais e profissionais durante o dia?',
    journey: 'fim',
  },
];

export const questionsBeforeWorkObjects = [
  {
    question: 'Como você avalia sua disposição para começar a trabalhar hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quão confiante você está em concluir suas tarefas hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quanto você espera que a tecnologia facilite seu trabalho hoje?',
    journey: 'inicio',
  },
  {
    question:
      'Quão preparado você se sente para usar as ferramentas digitais necessárias hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quão focado você se sente para iniciar o trabalho?',
    journey: 'inicio',
  },
  {
    question: 'Quão tranquilo você se sente ao iniciar sua jornada hoje?',
    journey: 'inicio',
  },
  {
    question:
      'Quanto você acha que conseguirá evitar distrações digitais hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quão satisfeito você está com o suporte tecnológico disponível?',
    journey: 'inicio',
  },
  {
    question:
      'Quão disposto você está para colaborar virtualmente com colegas hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quanto você espera que sua produtividade seja alta hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quão bem descansado você se sente para enfrentar o dia?',
    journey: 'inicio',
  },
  {
    question: 'Quão claro estão os objetivos do dia para você?',
    journey: 'inicio',
  },
  {
    question:
      'Quão otimista você está em relação ao sucesso do seu dia de trabalho?',
    journey: 'inicio',
  },
  {
    question:
      'Quão confortável você está com a quantidade de interações digitais esperadas hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quanto você acha que conseguirá manter o foco durante o dia?',
    journey: 'inicio',
  },
  {
    question:
      'Quão tranquilo você se sente em relação ao uso de novas tecnologias hoje?',
    journey: 'inicio',
  },
  {
    question: 'Quão motivado você está para atingir suas metas hoje?',
    journey: 'inicio',
  },
  {
    question:
      'Quão confiante você está em resolver problemas técnicos que possam surgir?',
    journey: 'inicio',
  },
  {
    question:
      'Quão equilibrado você se sente entre suas demandas pessoais e profissionais?',
    journey: 'inicio',
  },
  {
    question:
      'Quanto você acredita que conseguirá se desconectar após o expediente?',
    journey: 'inicio',
  },
];
