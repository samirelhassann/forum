import { Question } from "../../enterprise/entities/Question";
import { PaginationParams } from "@/core/repositories/PaginationParams";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  create(question: Question): Promise<Question>;
  edit(question: Question): Promise<Question>;
  delete(id: string): Promise<void>;
}
