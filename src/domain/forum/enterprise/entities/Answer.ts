import { Entity } from "@/core/entity/Entity";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { Optional } from "@/core/types/optional";

export interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  constructor(props: Optional<AnswerProps, "createdAt">, id?: UniqueEntityId) {
    super({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  get content() {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
