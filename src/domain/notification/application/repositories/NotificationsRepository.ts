import { Notification } from "../../enterprise/entities/Notification";

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>;
  create(notification: Notification): Promise<void>;
  update(notification: Notification): Promise<void>;
}
