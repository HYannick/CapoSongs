import { NotFound } from "@/common/domain/NotFound";
import { vi } from "vitest";
import type { Mock } from "vitest";

export const stubNotFound = () =>
  new NotFound({
    status: "not.found",
    message: "Not found",
    type: "not.found",
  });

export const mockFetch = () => {
  global.fetch = vi.fn();
  return fetch as Mock;
};
