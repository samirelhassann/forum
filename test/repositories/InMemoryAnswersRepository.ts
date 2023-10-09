import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from "@/core/repositories/PaginationParams";
import { AnswersRepository } from "@/domain/forum/application/repositories/AnswersRepository";
import { Answer } from "@/domain/forum/enterprise/entities/Answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer);

    return Promise.resolve(answer);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id) ?? null;

    return answer;
  }

  async findManyByAnswerId(
    questionId: string,
    { page, size = DEFAULT_PAGE_SIZE }: PaginationParams
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * size, page * size);

    return answers;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }

  async edit(answer: Answer): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString()
    );

    this.items[index] = answer;
  }
}
