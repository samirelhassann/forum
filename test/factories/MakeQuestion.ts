/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/Question";
import { Slug } from "@/domain/forum/enterprise/entities/valueObjects/Slug";
import { faker } from "@faker-js/faker";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId
): Question {
  const newQuestion = new Question(
    {
      authorId: new UniqueEntityId("authorId"),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: new Slug("slug-test"),
      ...override,
    },
    id
  );

  return newQuestion;
}
