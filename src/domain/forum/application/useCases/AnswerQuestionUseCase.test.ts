import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AnswerQuestionUseCase } from "./AnswerQuestionUseCase";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/InMemoryAnswerAttachmentsRepository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe("Given the Answer Question Use Case", () => {
  const content = "New Answer";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("should create an answer", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content,
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBeTruthy();
    expect(
      inMemoryAnswerRepository.items.find((i) => i.content === content)
    ).toBeTruthy();

    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: expect.objectContaining({ value: "1" }),
      }),
      expect.objectContaining({
        attachmentId: expect.objectContaining({ value: "2" }),
      }),
    ]);
  });
});
