/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "../useCases/SendNotificationUseCase";
import { AnswerCreatedSubscriber } from "./AnswerCreatedSubscriber";
import { makeAnswer } from "@test/factories/MakeAnswer";
import { makeQuestion } from "@test/factories/MakeQuestion";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswersRepository } from "@test/repositories/InMemoryAnswersRepository";
import { InMemoryNotificationRepository } from "@test/repositories/InMemoryNotificationsRepository";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionsRepository } from "@test/repositories/InMemoryQuestionsRepository";
import { waitFor } from "@test/utils/waitFor";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe("AnswerCreatedSubscriber", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    inMemoryNotificationRepository = new InMemoryNotificationRepository();

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    // eslint-disable-next-line no-new
    new AnswerCreatedSubscriber(
      inMemoryQuestionsRepository,
      sendNotificationUseCase
    );
  });

  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
