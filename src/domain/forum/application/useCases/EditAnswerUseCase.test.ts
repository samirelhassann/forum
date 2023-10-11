import { makeAnswer } from "test/factories/MakeAnswer";
import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EditAnswerUseCase } from "./EditAnswerUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { makeAnswerAttachment } from "@test/factories/MakeAnswerAttachment";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/InMemoryAnswerAttachmentsRepository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Given the delete answer use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository
    );
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

    await sut.execute({
      authorId: mockAuthorId,
      answerId: mockId,
      content: mockContent,
      attachmentsIds: ["1", "3"],
    });

    const hasAnswer = await inMemoryAnswersRepository.findById(mockId);

    expect(hasAnswer?.content).toBe(mockContent);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: expect.objectContaining({ value: "1" }),
        }),
        expect.objectContaining({
          attachmentId: expect.objectContaining({ value: "3" }),
        }),
      ]
    );
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

    const result = await sut.execute({
      authorId: "different-authorId",
      answerId: mockId,
      content: mockContent,
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
