import dayjs from "dayjs";

import { Slug } from "./valueObjects/Slug";
import { Entity } from "@/core/entity/Entity";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { Optional } from "@/core/types/optional";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  constructor(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super({ ...props, createdAt: new Date() }, id);
  }

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew() {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }
}
