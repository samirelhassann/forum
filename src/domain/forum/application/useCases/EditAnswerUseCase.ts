import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { Answer } from "../../enterprise/entities/Answer";
import { AnswerAttachment } from "../../enterprise/entities/AnswerAttachment";
import { AnswerAttachmentList } from "../../enterprise/entities/AnswerAttachmentList";
import { AnswerAttachmentsRepository } from "../repositories/AnswerAttachmentsRepository";
import { AnswersRepository } from "../repositories/AnswersRepository";
import { Either, left, right } from "@/core/Either";
import { UniqueEntityId } from "@/core/entities/UniqueEntityId";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer?.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    );

    const receivedAnswerAttachments = attachmentsIds.map((attachmentId) => {
      return new AnswerAttachment({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(receivedAnswerAttachments);

    answer.attachments = answerAttachmentList;
    answer.content = content;

    await this.answerRepository.edit(answer);

    return right({ answer });
  }
}
