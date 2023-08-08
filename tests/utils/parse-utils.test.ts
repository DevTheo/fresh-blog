import { assertEquals } from "https://deno.land/std@0.139.0/testing/asserts.ts";
import { parseUrlVars } from "../../utils/parse-utils.ts";

Deno.test("parseUrlVars", () => {
  const urlString = "https://example.com/?name=John%20Doe&returnPage=/about-us";
  const { kvp } = parseUrlVars(urlString);
  const expected: Record<string, string> = {
    name: "John Doe",
    returnPage: "/about-us",
  };
  assertEquals(kvp.name, expected.name);
  assertEquals(kvp.returnPage, expected.returnPage);

});