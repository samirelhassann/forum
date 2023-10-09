/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import {
  AnswerComment,
  AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/AnswerComment";
import { faker } from "@faker-js/faker";

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId
): AnswerComment {
  const newAnswerComment = new AnswerComment(
    {
      authorId: new UniqueEntityId("authorId"),
      answerId: new UniqueEntityId("answerId"),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return newAnswerComment;
}
