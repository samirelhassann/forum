import { expect, test } from "vitest";

import { Answer } from "../entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";
import { AnswerQuestionUseCase } from "./AnswerQuestionUseCase";

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return answer;
  },
};

test("create an answer", async () => {
  const useCase = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await useCase.execute({
    questionId: "1",
    instructorId: "1",
    content: "new answer",
  });

  expect(answer.content).toEqual("new answer");
});
