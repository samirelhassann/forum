/* eslint-disable default-param-last */
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from "@/domain/forum/enterprise/entities/AnswerAttachment";

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId
): AnswerAttachment {
  const newAnswerAttachmentsComment = new AnswerAttachment(
    {
      attachmentId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return newAnswerAttachmentsComment;
}
