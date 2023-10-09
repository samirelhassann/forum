import { makeQuestion } from "test/factories/MakeQuestion";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CommentOnQuestionUseCase } from "./CommentOnQuestionUseCase";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { InMemoryQuestionCommentRepository } from "@test/repositories/InMemoryQuestionCommentRepository";
import { InMemoryQuestionsRepository } from "@test/repositories/InMemoryQuestionsRepository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: CommentOnQuestionUseCase;

describe("Given the Comment on Question Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
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

    const { questionComment } = await sut.execute({
      authorId: "1",
      questionId: question.id.toString(),
      content,
    });

    expect(questionComment.content).toEqual(content);
  });
});
