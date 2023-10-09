/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/Answer";
import { faker } from "@faker-js/faker";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId
): Answer {
  const newQuestion = new Answer(
    {
      authorId: new UniqueEntityId("authorId"),
      questionId: new UniqueEntityId("questionId"),
      content: faker.lorem.text(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newQuestion;
}
