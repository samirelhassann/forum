import { Comment, CommentProps } from "./Comment";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { Optional } from "@/core/types/optional";

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  constructor(
    props: Optional<AnswerCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get answerId() {
    return this.props.answerId;
  }
}
