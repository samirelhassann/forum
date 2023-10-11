import { Entity } from "@/core/entities/Entity";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  constructor(props: StudentProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
