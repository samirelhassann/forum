import { Answer } from "../../enterprise/entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";
import { NotAllowedError } from "./errors/NotAllowedError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { Either, left, right } from "@/core/Either";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer?.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answerRepository.edit(answer);

    return right({ answer });
  }
}
