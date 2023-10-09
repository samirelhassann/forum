import { Answer } from "../../enterprise/entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";

interface ListQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

interface ListQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByAnswerId(
      questionId,
      { page }
    );

    return { answers };
  }
}
