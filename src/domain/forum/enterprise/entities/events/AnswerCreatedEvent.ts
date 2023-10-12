import { Answer } from "../Answer";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { DomainEvent } from "@/core/events/DomainEvent";

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;

  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id;
  }
}
