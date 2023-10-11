/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import {
  QuestionComment,
  QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/QuestionComment";
import { faker } from "@faker-js/faker";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId
): QuestionComment {
  const newQuestionComment = new QuestionComment(
    {
      authorId: new UniqueEntityId("authorId"),
      questionId: new UniqueEntityId("questionId"),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return newQuestionComment;
}
