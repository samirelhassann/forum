import { beforeEach, describe, expect, it, vi } from "vitest";

import { ListQuestionCommentsUseCase } from "./ListQuestionCommentsUseCase";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { makeQuestionComment } from "@test/factories/MakeQuestionComment";
import { InMemoryQuestionCommentRepository } from "@test/repositories/InMemoryQuestionCommentRepository";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: ListQuestionCommentsUseCase;

describe("List Question Comments Use Case", () => {
  const questionId = "question-1";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentRepository);
  });

  it("should be able to list que question comments", async () => {
    Array.from({ length: 3 }).forEach(async () => {
      const questionComment = makeQuestionComment({
        questionId: new UniqueEntityId(questionId),
      });

      await inMemoryQuestionCommentRepository.create(questionComment);
    });

    const { comments } = await sut.execute({
      questionId,
      page: 1,
    });

    expect(comments.length).toEqual(3);
  });

  it("should return the quantity page correctly", async () => {
    Array.from({ length: 22 }).forEach(async () => {
      const questionComment = makeQuestionComment({
        questionId: new UniqueEntityId(questionId),
      });

      await inMemoryQuestionCommentRepository.create(questionComment);
    });

    const { comments } = await sut.execute({
      questionId,
      page: 2,
    });

    expect(comments).toHaveLength(2);
  });
});
