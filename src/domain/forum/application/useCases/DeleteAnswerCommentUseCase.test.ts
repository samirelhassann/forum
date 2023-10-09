import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteAnswerCommentUseCase } from "./DeleteAnswerCommentUseCase";
import { NotAllowedError } from "./errors/NotAllowedError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { makeAnswerComment } from "@test/factories/MakeAnswerComment";
import { InMemoryAnswerCommentRepository } from "@test/repositories/InMemoryAnswerCommentRepository";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Given the Delete Answer Comment USe Case", () => {
  const authorId = "authorId-1";
  const answerCommentId = "answer-comment-1";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository);
  });

  it("should delete a answer comment", async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(answerCommentId)
    );

    await inMemoryAnswerCommentRepository.create(answerComment);

    await sut.execute({
      authorId,
      answerCommentId,
    });

    const hasAnswerComment = await inMemoryAnswerCommentRepository.findById(
      answerCommentId
    );

    expect(hasAnswerComment).toBeFalsy();
  });

  it("should throw an error when the answer comment does not exist", async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(answerCommentId)
    );

    await inMemoryAnswerCommentRepository.create(answerComment);

    const result = await sut.execute({
      authorId,
      answerCommentId: "different-answer-comment-id",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw an error when the authorId is different", async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(answerCommentId)
    );

    await inMemoryAnswerCommentRepository.create(answerComment);

    const result = await sut.execute({
      authorId: "different-author-id",
      answerCommentId,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
