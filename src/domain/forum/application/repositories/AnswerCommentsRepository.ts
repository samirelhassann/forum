import { AnswerComment } from "../../enterprise/entities/AnswerComment";
import { PaginationParams } from "@/core/repositories/PaginationParams";

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    questionId: string,
    params: PaginationParams
  ): Promise<AnswerComment[]>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(id: string): Promise<void>;
}
