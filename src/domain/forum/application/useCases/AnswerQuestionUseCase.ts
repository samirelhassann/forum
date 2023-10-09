/* eslint-disable no-empty-function */

import { Answer } from "../../enterprise/entities/Answer";
import { Either, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { AnswersRepository } from "@/domain/forum/application/repositories/AnswersRepository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = new Answer({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
