import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { Question } from "../../enterprise/entities/Question";
import { QuestionAttachment } from "../../enterprise/entities/QuestionAttachment";
import { QuestionAttachmentList } from "../../enterprise/entities/QuestionAttachmentList";
import { QuestionAttachmentsRepository } from "../repositories/QuestionAttachmentsRepository";
import { QuestionsRepository } from "../repositories/QuestionsRepository";
import { Either, left, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question?.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments
    );

    const receivedQuestionAttachments = attachmentsIds.map((attachmentId) => {
      return new QuestionAttachment({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(receivedQuestionAttachments);

    question.attachments = questionAttachmentList;
    question.title = title;
    question.content = content;

    await this.questionRepository.edit(question);

    return right({ question });
  }
}
