import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Slug } from "../../enterprise/entities/valueObjects/Slug";
import { GetQuestionBySlugUseCase } from "./GetQuestionBySlugUseCase";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/InMemoryQuestionAttachmentsRepository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Given the get question by slug use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should return a question by slug", async () => {
    const mockSlug = "example-question";

    const questionToCreate = makeQuestion({
      slug: new Slug(mockSlug),
    });

    inMemoryQuestionsRepository.create(questionToCreate);

    const result = await sut.execute({
      slug: mockSlug,
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        slug: { value: mockSlug },
      }),
    });
  });
});
