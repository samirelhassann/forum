import { Answer } from "../../enterprise/entities/Answer";
import { PaginationParams } from "@/core/repositories/PaginationParams";

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>;

  findById(id: string): Promise<Answer | null>;

  findManyByAnswerId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;

  delete(id: string): Promise<void>;

  edit(answer: Answer): Promise<void>;
}
