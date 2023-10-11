import { makeAnswer } from "test/factories/MakeAnswer";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CommentOnAnswerUseCase } from "./CommentOnAnswerUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerCommentRepository } from "@test/repositories/InMemoryAnswerCommentRepository";
import { InMemoryAnswersRepository } from "@test/repositories/InMemoryAnswersRepository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: CommentOnAnswerUseCase;

describe("Given the Comment on Answer Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository
    );
  });

  it("should create an answer comment", async () => {
    const content = "Answer comment";

    const answer = makeAnswer({}, new UniqueEntityId("answer-1"));

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      authorId: "1",
      answerId: answer.id.toString(),
      content,
    });

    expect(result.value).toMatchObject({
      answerComment: expect.objectContaining({ content }),
    });
  });
});
