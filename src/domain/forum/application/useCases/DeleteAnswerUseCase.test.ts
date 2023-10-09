import { makeAnswer } from "test/factories/MakeAnswer";
import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";
import { NotAllowedError } from "./errors/NotAllowedError";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Given the delete answer use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should delete the answer by id", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

    const questionToCreate = makeAnswer(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryAnswersRepository.create(questionToCreate);

    await sut.execute({ authorId: mockAuthorId, answerId: mockId });

    const hasQuestion = await inMemoryAnswersRepository.findById(mockId);

    expect(hasQuestion).toBeNull();
  });

  it("should throw an error when the authorId is different", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

    const questionToCreate = makeAnswer(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryAnswersRepository.create(questionToCreate);

    const result = await sut.execute({
      authorId: "different-authorId",
      answerId: mockId,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
