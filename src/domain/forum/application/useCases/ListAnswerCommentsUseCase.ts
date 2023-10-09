import { AnswerComment } from "../../enterprise/entities/AnswerComment";
import { AnswerCommentsRepository } from "../repositories/AnswerCommentsRepository";

interface ListAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface ListAnswerCommentsUseCaseResponse {
  comments: AnswerComment[];
}

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerId(
      answerId,
      { page }
    );

    return { comments };
  }
}
