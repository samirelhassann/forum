import { Answer } from "../../enterprise/entities/Answer";
import { AnswerAttachment } from "../../enterprise/entities/AnswerAttachment";
import { AnswerAttachmentList } from "../../enterprise/entities/AnswerAttachmentList";
import { Either, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { AnswersRepository } from "@/domain/forum/application/repositories/AnswersRepository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = new Answer({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return new AnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityId(attachmentId),
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
