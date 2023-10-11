import { Question } from "../../enterprise/entities/Question";
import { QuestionAttachment } from "../../enterprise/entities/QuestionAttachment";
import { QuestionAttachmentList } from "../../enterprise/entities/QuestionAttachmentList";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { Either, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = new Question({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return new QuestionAttachment({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionRepository.create(question);

    return right({ question });
  }
}
