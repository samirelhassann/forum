import { QuestionCommentsRepository } from "../repositories/QuestionCommentsRepository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("Question comment not found");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.questionCommentsRepository.delete(questionComment.id.toString());
  }
}
