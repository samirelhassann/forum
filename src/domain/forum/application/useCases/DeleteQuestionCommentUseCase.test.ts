import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteQuestionCommentUseCase } from "./DeleteQuestionCommentUseCase";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { makeQuestionComment } from "@test/factories/MakeQuestionComment";
import { InMemoryQuestionCommentRepository } from "@test/repositories/InMemoryQuestionCommentRepository";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Given the Delete Question Comment USe Case", () => {
  const authorId = "authorId-1";
  const questionCommentId = "question-comment-1";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository);
  });

  it("should delete a question comment", async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(questionCommentId)
    );

    await inMemoryQuestionCommentRepository.create(questionComment);

    await sut.execute({
      authorId,
      questionCommentId,
    });

    const hasQuestionComment = await inMemoryQuestionCommentRepository.findById(
      questionCommentId
    );

    expect(hasQuestionComment).toBeFalsy();
  });

  it("should throw an error when the question comment does not exist", async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(questionCommentId)
    );

    await inMemoryQuestionCommentRepository.create(questionComment);

    expect(() => {
      return sut.execute({
        authorId,
        questionCommentId: "different-question-comment-id",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should throw an error when the authorId is different", async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(questionCommentId)
    );

    await inMemoryQuestionCommentRepository.create(questionComment);

    expect(() => {
      return sut.execute({
        authorId: "different-author-id",
        questionCommentId,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
