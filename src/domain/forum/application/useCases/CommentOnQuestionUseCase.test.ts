import { makeQuestion } from "test/factories/MakeQuestion";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CommentOnQuestionUseCase } from "./CommentOnQuestionUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionCommentRepository } from "@test/repositories/InMemoryQuestionCommentRepository";
import { InMemoryQuestionsRepository } from "@test/repositories/InMemoryQuestionsRepository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Given the Comment on Question Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository
    );
  });

  it("should create an question comment", async () => {
    const content = "Question comment";

    const question = makeQuestion({}, new UniqueEntityId("question-1"));

    await inMemoryQuestionsRepository.create(question);

    const result = await sut.execute({
      authorId: "1",
      questionId: question.id.toString(),
      content,
    });

    expect(result.value).toMatchObject({
      questionComment: expect.objectContaining({ content }),
    });
  });
});
