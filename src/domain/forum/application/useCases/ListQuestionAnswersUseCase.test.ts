import { makeAnswer } from "test/factories/MakeAnswer";
import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ListQuestionAnswersUseCase } from "./ListQuestionAnswersUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/InMemoryAnswerAttachmentsRepository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: ListQuestionAnswersUseCase;

describe("List Question Answers Use Case", () => {
  const questionIdMock = "question-1";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should return the answers about the specific questionId", async () => {
    const answer1 = makeAnswer({
      questionId: new UniqueEntityId(questionIdMock),
    });
    const answer2 = makeAnswer({
      questionId: new UniqueEntityId(questionIdMock),
    });
    const answer3 = makeAnswer({
      questionId: new UniqueEntityId("question-2"),
    });

    await inMemoryAnswersRepository.create(answer1);
    await inMemoryAnswersRepository.create(answer2);
    await inMemoryAnswersRepository.create(answer3);

    const result = await sut.execute({
      questionId: questionIdMock,
      page: 1,
    });

    expect(result.value?.answers.length).toEqual(2);
  });

  it("should return the quantity page correctly", async () => {
    Array.from({ length: 21 }).forEach(async () => {
      const question = makeAnswer({
        questionId: new UniqueEntityId(questionIdMock),
      });
      await inMemoryAnswersRepository.create(question);
    });

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.answers).toHaveLength(20);
  });
});
