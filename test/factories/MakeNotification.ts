/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import {
  NotificationProps,
  Notification,
} from "@/domain/notification/enterprise/entities/Notification";
import { faker } from "@faker-js/faker";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId
): Notification {
  const newNotification = new Notification(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return newNotification;
}
