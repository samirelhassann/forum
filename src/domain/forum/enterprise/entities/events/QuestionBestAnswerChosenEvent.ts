import { Question } from "../Question";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { DomainEvent } from "@/core/events/DomainEvent";

export class QuestionBestQuestionChosenEvent implements DomainEvent {
  public ocurredAt: Date;

  public question: Question;

  public bestAnswerId: UniqueEntityId;

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}
