import { Entity } from "@/core/entity/Entity";
import { UniqueEntityId } from "@/core/entity/UniqueEntityId";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  constructor(props: StudentProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
