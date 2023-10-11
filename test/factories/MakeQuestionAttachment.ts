/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from "@/domain/forum/enterprise/entities/QuestionAttachment";

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId
): QuestionAttachment {
  const newQuestionAttachmentsComment = new QuestionAttachment(
    {
      attachmentId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return newQuestionAttachmentsComment;
}
