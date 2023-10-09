import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from "@/core/repositories/PaginationParams";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/AnswerCommentsRepository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/AnswerComment";

export class InMemoryAnswerCommentRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(id: string): Promise<AnswerComment | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    return answer ?? null;
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }

  async findManyByAnswerId(
    questionId: string,
    { page, size = DEFAULT_PAGE_SIZE }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === questionId)
      .slice((page - 1) * size, page * size);

    return answerComments;
  }
}
