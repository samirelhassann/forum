import { Answer } from "../entities/Answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>;
}
