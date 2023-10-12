import { SendNotificationUseCase } from "../useCases/SendNotificationUseCase";
import { DomainEvents } from "@/core/events/DomainEvents";
import { EventHandler } from "@/core/events/EventHandler";
import { AnswersRepository } from "@/domain/forum/application/repositories/AnswersRepository";
import { QuestionBestQuestionChosenEvent } from "@/domain/forum/enterprise/entities/events/QuestionBestAnswerChosenEvent";

export class QuestionBestAnswerChosenSubscriber implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotificationUseCase: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestQuestionChosenEvent.name
    );
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestQuestionChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString()
    );

    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: "Your answer was chosen!",
        content: `The answer you wrote on the question "${question.title
          .substring(0, 20)
          .concat("...")}" was chosen as the best answer!`,
      });
    }

    console.log("• [LOG] - answer", answer);
  }
}
