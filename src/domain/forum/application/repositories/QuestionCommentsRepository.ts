import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { PaginationParams } from "@/core/repositories/PaginationParams";

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(id: string): Promise<void>;
}
