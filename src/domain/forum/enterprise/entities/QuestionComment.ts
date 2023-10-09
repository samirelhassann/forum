import { Comment, CommentProps } from "./Comment";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";
import { Optional } from "@/core/types/optional";

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  constructor(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get questionId() {
    return this.props.questionId;
  }
}
