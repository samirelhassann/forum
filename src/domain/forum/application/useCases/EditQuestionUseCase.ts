import { Question } from "../../enterprise/entities/Question";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { NotAllowedError } from "./errors/NotAllowedError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { Either, left, right } from "@/core/Either";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question?.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.title = title;

    question.content = content;

    await this.questionRepository.edit(question);

    return right({ question });
  }
}
