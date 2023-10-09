import { Question } from "../../enterprise/entities/Question";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { Either, right } from "@/core/Either";

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

type ListRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({ questions });
  }
}
