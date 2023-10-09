import { makeAnswer } from "test/factories/MakeAnswer";
import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EditAnswerUseCase } from "./EditAnswerUseCase";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Given the delete answer use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should delete the answer by id", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";
    const mockContent = "content";

    const answerToCreate = makeAnswer(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryAnswersRepository.create(answerToCreate);

    await sut.execute({
      authorId: mockAuthorId,
      answerId: mockId,
      content: mockContent,
    });

    const hasAnswer = await inMemoryAnswersRepository.findById(mockId);

    expect(hasAnswer?.content).toBe(mockContent);
  });

  it("should throw an error when the authorId is different", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";
    const mockContent = "content";

    const answerToCreate = makeAnswer(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryAnswersRepository.create(answerToCreate);

    expect(() => {
      return sut.execute({
        authorId: "different-authorId",
        answerId: mockId,
        content: mockContent,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
