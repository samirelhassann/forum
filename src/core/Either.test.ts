import { beforeEach, describe, expect, it, vi } from "vitest";

import { Either, left, right } from "./Either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  }

  return left("error");
}

describe("Given the Either", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Success result", async () => {
    const result = doSomething(true);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
  });

  it("Error result", async () => {
    const result = doSomething(false);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
  });
});
