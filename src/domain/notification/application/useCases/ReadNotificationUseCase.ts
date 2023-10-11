import { NotificationRepository } from "../repositories/NotificationsRepository";
import { Either, left, right } from "@/core/Either";
import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";

interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId
    );

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.markAsRead();

    await this.notificationRepository.update(notification);

    return right({});
  }
}
