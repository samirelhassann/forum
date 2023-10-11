import { Entity } from "@/core/entities/Entity";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

export interface AnswerAttachmentProps {
  answerId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  constructor(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }
}
