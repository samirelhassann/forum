import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReadNotificationUseCase } from "./ReadNotificationUseCase";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { makeNotification } from "@test/factories/MakeNotification";
import { InMemoryNotificationRepository } from "@test/repositories/InMemoryNotificationsRepository";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe("Given the Read Notification Use Case", () => {
  const notificationId = "123";
  const recipientId = "456";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryNotificationRepository = new InMemoryNotificationRepository();

    sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should mark the notification as read", async () => {
    const notification = makeNotification(
      {
        recipientId: new UniqueEntityId(recipientId),
      },
      new UniqueEntityId(notificationId)
    );

    inMemoryNotificationRepository.items.push(notification);

    const result = await sut.execute({
      recipientId,
      notificationId,
    });

    const updatedNotification = inMemoryNotificationRepository.items.find(
      (item) => item.id.toString() === notificationId
    );

    expect(result.isRight()).toBeTruthy();
    expect(updatedNotification?.readAt).toEqual(expect.any(Date));
  });

  it("should throw an error when the recipientId is different", async () => {
    const notification = makeNotification(
      {
        recipientId: new UniqueEntityId(recipientId),
      },
      new UniqueEntityId(notificationId)
    );

    inMemoryNotificationRepository.items.push(notification);

    const result = await sut.execute({
      recipientId: "different",
      notificationId,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should throw an error when the the notification is not founded", async () => {
    const notification = makeNotification(
      {
        recipientId: new UniqueEntityId(recipientId),
      },
      new UniqueEntityId(notificationId)
    );

    inMemoryNotificationRepository.items.push(notification);

    const result = await sut.execute({
      recipientId,
      notificationId: "different",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
