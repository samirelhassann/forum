import { beforeEach, describe, expect, it, vi } from "vitest";

import { ListAnswerCommentsUseCase } from "./ListAnswerCommentsUseCase";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { makeAnswerComment } from "@test/factories/MakeAnswerComment";
import { InMemoryAnswerCommentRepository } from "@test/repositories/InMemoryAnswerCommentRepository";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: ListAnswerCommentsUseCase;

describe("List Answer Comments Use Case", () => {
  const answerId = "answer-1";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentRepository);
  });

  it("should be able to list que answer comments", async () => {
    Array.from({ length: 3 }).forEach(async () => {
      const answerComment = makeAnswerComment({
        answerId: new UniqueEntityId(answerId),
      });

      await inMemoryAnswerCommentRepository.create(answerComment);
    });

    const { comments } = await sut.execute({
      answerId,
      page: 1,
    });

    expect(comments.length).toEqual(3);
  });

  it("should return the quantity page correctly", async () => {
    Array.from({ length: 22 }).forEach(async () => {
      const answerComment = makeAnswerComment({
        answerId: new UniqueEntityId(answerId),
      });

      await inMemoryAnswerCommentRepository.create(answerComment);
    });

    const { comments } = await sut.execute({
      answerId,
      page: 2,
    });

    expect(comments).toHaveLength(2);
  });
});
