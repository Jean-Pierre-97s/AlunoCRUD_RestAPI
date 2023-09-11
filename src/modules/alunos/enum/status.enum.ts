export enum Status {
  ativo = 'ativo', // Alunos atualmente matriculados em cursos.
  inativo = 'inativo', // Alunos que não estão mais matriculados na escola.
  suspenso = 'suspenso', // Alunos que foram temporariamente suspensos por violação das regras da escola.
  transferido = 'transferido', // Alunos que foram transferidos para outra escola.
  formado = 'formado', // Alunos que concluíram com sucesso todos os requisitos do curso.
  trancado = 'trancado', // Alunos que solicitaram um período de trancamento de matrícula.
  pendente = 'pendente', // Alunos cuja matrícula está aguardando aprovação ou processamento.
}
