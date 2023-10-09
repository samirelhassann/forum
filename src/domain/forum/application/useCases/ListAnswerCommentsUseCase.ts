import { AnswerComment } from "../../enterprise/entities/AnswerComment";
import { AnswerCommentsRepository } from "../repositories/AnswerCommentsRepository";
import { Either, right } from "@/core/Either";

interface ListAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type ListAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: AnswerComment[];
  }
>;

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

    return right({ comments });
  }
}
