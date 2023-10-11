import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from "@/core/repositories/PaginationParams";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/QuestionAttachmentsRepository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/QuestionsRepository";
import { Question } from "@/domain/forum/enterprise/entities/Question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async create(question: Question): Promise<Question> {
    this.items.push(question);

    return question;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return Promise.resolve(
      this.items.find((item) => item.slug.value === slug) ?? null
    );
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
    this.questionAttachmentsRepository.deleteManyByQuestionId(id);
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    return question ?? null;
  }

  async edit(question: Question): Promise<Question> {
    this.items = this.items.map((q) => {
      if (q.id.toString() === question.id.toString()) {
        return question;
      }

      return q;
    });

    return question;
  }

  async findManyRecent({
    page,
    size = DEFAULT_PAGE_SIZE,
  }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * size, page * size);

    return questions;
  }
}
