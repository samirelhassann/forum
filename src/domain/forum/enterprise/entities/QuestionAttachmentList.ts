import { QuestionAttachment } from "./QuestionAttachment";
import { WatchedList } from "@/core/entities/WatchedList";

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId);
  }
}
