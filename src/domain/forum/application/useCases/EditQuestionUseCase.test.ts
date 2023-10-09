import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EditQuestionUseCase } from "./EditQuestionUseCase";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Given the delete question use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should delete the question by id", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";
    const mockTitle = "title";
    const mockContent = "content";

    const questionToCreate = makeQuestion(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryQuestionsRepository.create(questionToCreate);

    await sut.execute({
      authorId: mockAuthorId,
      questionId: mockId,
      title: mockTitle,
      content: mockContent,
    });

    const hasQuestion = await inMemoryQuestionsRepository.findById(mockId);

    expect(hasQuestion?.title).toBe(mockTitle);
    expect(hasQuestion?.content).toBe(mockContent);
  });

  it("should throw an error when the authorId is different", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";
    const mockTitle = "title";
    const mockContent = "content";

    const questionToCreate = makeQuestion(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryQuestionsRepository.create(questionToCreate);

    expect(() => {
      return sut.execute({
        authorId: "different-authorId",
        questionId: mockId,
        title: mockTitle,
        content: mockContent,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
