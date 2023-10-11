import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/QuestionAttachmentsRepository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/QuestionAttachment";

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(
    questionId: string
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId
    );

    return questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    this.items = this.items.filter(
      (item) => item.questionId.toString() !== questionId
    );
  }
}
