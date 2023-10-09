import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteQuestionUseCase } from "./DeleteQuestionUseCase";
import { NotAllowedError } from "./errors/NotAllowedError";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Given the delete question use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should delete the question by id", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

    const questionToCreate = makeQuestion(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryQuestionsRepository.create(questionToCreate);

    await sut.execute({ authorId: mockAuthorId, questionId: mockId });

    const hasQuestion = await inMemoryQuestionsRepository.findById(mockId);

    expect(hasQuestion).toBeNull();
  });

  it("should throw an error when the authorId is different", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

    const questionToCreate = makeQuestion(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryQuestionsRepository.create(questionToCreate);

    const result = await sut.execute({
      authorId: "different-authorId",
      questionId: mockId,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
