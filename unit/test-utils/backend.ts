import { NotFound } from "@/common/domain/NotFound";


export const stubNotFound = () =>
  new NotFound({
    status: "not.found",
    message: "Not found",
    type: "not.found",
  });