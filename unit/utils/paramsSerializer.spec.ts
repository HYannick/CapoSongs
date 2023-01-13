import { describe, it, expect } from "vitest";
import { paramsSerializer } from "@/api/paramsSerializer";

describe("Params Serializer", () => {
  it("should serialize request params correctly", () => {
    expect(
      paramsSerializer({
        num: ["one", "two", "three"],
      })
    ).toEqual("num=one&num=two&num=three");
  });
});
