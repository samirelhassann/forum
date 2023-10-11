import { makeAnswer } from "test/factories/MakeAnswer";
import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { makeAnswerAttachment } from "@test/factories/MakeAnswerAttachment";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/InMemoryAnswerAttachmentsRepository";
import { NotAllowedError } from "@/core/errors/NotAllowedError";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Given the delete answer use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should delete the answer by id", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

    const answerToCreate = makeAnswer(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    await inMemoryAnswersRepository.create(answerToCreate);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: answerToCreate.id,
        attachmentId: new UniqueEntityId("1"),
      }),
      makeAnswerAttachment({
        answerId: answerToCreate.id,
        attachmentId: new UniqueEntityId("2"),
      })
    );

    await sut.execute({ authorId: mockAuthorId, answerId: mockId });

    const hasAnswer = await inMemoryAnswersRepository.findById(mockId);

    expect(hasAnswer).toBeNull();
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it("should throw an error when the authorId is different", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

    const answerToCreate = makeAnswer(
      { authorId: new UniqueEntityId(mockAuthorId) },
      new UniqueEntityId(mockId)
    );

    inMemoryAnswersRepository.create(answerToCreate);

    const result = await sut.execute({
      authorId: "different-authorId",
      answerId: mockId,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
