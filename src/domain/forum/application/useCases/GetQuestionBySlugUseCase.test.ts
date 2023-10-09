import { makeQuestion } from "test/factories/MakeQuestion";
import { InMemoryQuestionsRepository } from "test/repositories/InMemoryQuestionsRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Slug } from "../../enterprise/entities/valueObjects/Slug";
import { GetQuestionBySlugUseCase } from "./GetQuestionBySlugUseCase";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Given the get question by slug use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
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

    expect(result.value?.question.slug.value).toEqual(mockSlug);
  });
});
