import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { QuestionCommentsRepository } from "../repositories/QuestionCommentsRepository";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { Either, left, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = new QuestionComment({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
