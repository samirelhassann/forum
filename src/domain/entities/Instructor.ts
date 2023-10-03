import { Entity } from "@/core/entity/Entity";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  constructor(props: InstructorProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
