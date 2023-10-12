import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";
import { DomainEvents } from "@/core/events/DomainEvents";
import { EventHandler } from "@/core/events/EventHandler";
import { QuestionsRepository } from "@/domain/forum/application/repositories/QuestionsRepository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/entities/events/AnswerCreatedEvent";

export class AnswerCreatedSubscriber implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotificationUseCase: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (question) {
      await this.sendNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `New answer in ${question.title.substring(0, 40).concat("...")}`,
        content: answer.excerpt,
      });
    }

    console.log("• [LOG] - answer", answer);
  }
}
