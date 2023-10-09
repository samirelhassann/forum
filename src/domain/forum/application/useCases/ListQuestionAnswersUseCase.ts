import { Answer } from "../../enterprise/entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";
import { Either, right } from "@/core/Either";

interface ListQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type ListQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

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

    return right({ answers });
  }
}
