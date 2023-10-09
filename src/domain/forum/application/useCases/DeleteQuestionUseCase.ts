import { QuestionsRepository } from "../repositories/QuestionsRepository";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest) {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (question?.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.questionRepository.delete(questionId);
  }
}
