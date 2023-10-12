import { Notification } from "../../enterprise/entities/Notification";
import { NotificationRepository } from "../repositories/NotificationsRepository";
import { Either, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = new Notification({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
