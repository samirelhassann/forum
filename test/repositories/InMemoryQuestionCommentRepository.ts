import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from "@/core/repositories/PaginationParams";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/QuestionCommentsRepository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/QuestionComment";

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string): Promise<QuestionComment | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    return question ?? null;
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }

  async findManyByQuestionId(
    questionId: string,
    { page, size = DEFAULT_PAGE_SIZE }: PaginationParams
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * size, page * size);

    return questionComments;
  }
}
