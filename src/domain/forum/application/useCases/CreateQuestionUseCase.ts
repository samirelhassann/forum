import { Question } from "../../enterprise/entities/Question";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { Either, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = new Question({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionRepository.create(question);

    return right({ question });
  }
}
