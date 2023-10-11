import { beforeEach, describe, expect, it, vi } from "vitest";

import { SendNotificationUseCase } from "./SendNotificationUseCase";
import { InMemoryNotificationRepository } from "@test/repositories/InMemoryNotificationsRepository";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe("Given the Send Notification Use Case", () => {
  const recipientId = "1";
  const title = "New Notification";
  const content = "New Content Notification";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryNotificationRepository = new InMemoryNotificationRepository();

    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should create an notification", async () => {
    const result = await sut.execute({
      recipientId,
      title,
      content,
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification
    );
  });
});
