import { AnswerCommentsRepository } from "../repositories/AnswerCommentsRepository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      throw new Error("Answer comment not found");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.answerCommentsRepository.delete(answerComment.id.toString());
  }
}
