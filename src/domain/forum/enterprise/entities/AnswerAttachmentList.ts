import { AnswerAttachment } from "./AnswerAttachment";
import { WatchedList } from "@/core/entities/WatchedList";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}
