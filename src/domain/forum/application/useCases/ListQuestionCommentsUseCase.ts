import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { QuestionCommentsRepository } from "../repositories/QuestionCommentsRepository";
import { Either, right } from "@/core/Either";

interface ListQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type ListQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: QuestionComment[];
  }
>;

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return right({ comments });
  }
}
