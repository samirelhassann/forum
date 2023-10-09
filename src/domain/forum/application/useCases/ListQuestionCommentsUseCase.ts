import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { QuestionCommentsRepository } from "../repositories/QuestionCommentsRepository";

interface ListQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface ListQuestionCommentsUseCaseResponse {
  comments: QuestionComment[];
}

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

    return { comments };
  }
}
