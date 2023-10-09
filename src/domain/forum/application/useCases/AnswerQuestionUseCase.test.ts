import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AnswerQuestionUseCase } from "./AnswerQuestionUseCase";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Given the Answer Question Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("should create an answer", async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "New Answer",
    });

    expect(answer.content).toEqual("New Answer");
    expect(
      inMemoryAnswerRepository.items.find((i) => i.content === "New Answer")
    ).toBeTruthy();
  });
});
