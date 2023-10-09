import { makeAnswer } from "test/factories/MakeAnswer";
import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryAnswersRepository } from "test/repositories/InMemoryAnswersRepository";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ChooseQuestionBestAnswerUseCase } from "./ChooseQuestionBestAnswerUseCase";
import { NotAllowedError } from "./errors/NotAllowedError";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question best answer", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository
    );
  });

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);

    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(result.isRight()).toBeTruthy();

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toBe(answer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("author-1"),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
