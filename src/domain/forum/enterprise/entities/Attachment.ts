import { Entity } from "@/core/entities/Entity";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

interface AttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends Entity<AttachmentProps> {
  constructor(props: AttachmentProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }
}
