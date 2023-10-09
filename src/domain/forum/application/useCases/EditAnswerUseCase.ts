import { Answer } from "../../enterprise/entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer?.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    answer.content = content;

    await this.answerRepository.edit(answer);

    return { answer };
  }
}
