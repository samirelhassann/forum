import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteQuestionUseCase } from "./DeleteQuestionUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { makeQuestionAttachment } from "@test/factories/MakeQuestionAttachment";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/InMemoryQuestionAttachmentsRepository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe("Given the delete question use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should delete the question by id", async () => {
    const mockId = "123";
    const mockAuthorId = "authorId";

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

    await sut.execute({ authorId: mockAuthorId, questionId: mockId });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
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
