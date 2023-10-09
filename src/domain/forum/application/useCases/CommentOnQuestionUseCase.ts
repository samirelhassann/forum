import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { QuestionCommentsRepository } from "../repositories/QuestionCommentsRepository";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

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
      throw new Error("Question not found");
    }

    const questionComment = new QuestionComment({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
