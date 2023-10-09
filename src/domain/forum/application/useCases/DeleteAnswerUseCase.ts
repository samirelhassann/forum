import { AnswersRepository } from "../repositories/AnswersRepository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("answer not found");
    }

    if (answer?.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.answersRepository.delete(answerId);
  }
}
