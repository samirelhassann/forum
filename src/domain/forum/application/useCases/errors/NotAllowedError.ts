import { UseCaseError } from "@/core/errors/UseCaseError";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not Allowed.");
  }
}
