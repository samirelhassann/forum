import { AnswerComment } from "../../enterprise/entities/AnswerComment";
import { AnswerCommentsRepository } from "../repositories/AnswerCommentsRepository";
import { AnswersRepository } from "../repositories/AnswersRepository";
import { NotAllowedError } from "./errors/NotAllowedError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { Either, left, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = new AnswerComment({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}
