import { Entity } from "@/core/entities/Entity";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  constructor(props: InstructorProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
