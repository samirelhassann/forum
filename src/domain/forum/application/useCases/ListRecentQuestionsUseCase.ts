import { Question } from "../../enterprise/entities/Question";
import { QuestionsRepository } from "../repositories/QuestionsRepository";

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

interface ListRecentQuestionsUseCaseResponse {
  questions: Question[];
}

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return { questions };
  }
}
