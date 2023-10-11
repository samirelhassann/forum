import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { EditQuestionUseCase } from "./EditQuestionUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { makeQuestionAttachment } from "@test/factories/MakeQuestionAttachment";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/InMemoryQuestionAttachmentsRepository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let sut: EditQuestionUseCase;

describe("Given the delete question use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository
    );
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

    await inMemoryQuestionsRepository.create(questionToCreate);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: questionToCreate.id,
        attachmentId: new UniqueEntityId("1"),
      }),
      makeQuestionAttachment({
        questionId: questionToCreate.id,
        attachmentId: new UniqueEntityId("2"),
      })
    );

    await sut.execute({
      authorId: mockAuthorId,
      questionId: mockId,
      title: mockTitle,
      content: mockContent,
      attachmentsIds: ["1", "3"],
    });

    const hasQuestion = await inMemoryQuestionsRepository.findById(mockId);

    expect(hasQuestion?.title).toBe(mockTitle);
    expect(hasQuestion?.content).toBe(mockContent);
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({
        attachmentId: expect.objectContaining({ value: "1" }),
      }),
      expect.objectContaining({
        attachmentId: expect.objectContaining({ value: "3" }),
      }),
    ]);
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

    const result = await sut.execute({
      authorId: "different-authorId",
      questionId: mockId,
      title: mockTitle,
      content: mockContent,
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
