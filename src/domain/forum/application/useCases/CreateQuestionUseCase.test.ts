import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Given the create question use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should create an answer", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "1",
      content: "New Question",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.question.content).toEqual("New Question");
  });
});
