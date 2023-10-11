import { Entity } from "@/core/entities/Entity";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Optional } from "@/core/types/optional";

export interface NotificationProps {
  recipientId: UniqueEntityId;
  title: string;
  content: string;
  createdAt: Date;
  readAt?: Date;
  updatedAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  constructor(
    props: Optional<NotificationProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  public markAsRead() {
    this.props.readAt = new Date();
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
