import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AnswerQuestionUseCase } from "./AnswerQuestionUseCase";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Given the Answer Question Use Case", () => {
  const content = "New Answer";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("should create an answer", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content,
    });

    expect(result.isRight()).toBeTruthy();
    expect(
      inMemoryAnswerRepository.items.find((i) => i.content === content)
    ).toBeTruthy();
  });
});
