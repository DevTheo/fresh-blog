import { assertEquals } from "https://deno.land/std@0.139.0/testing/asserts.ts";
import { loadUrlVars } from "../../routes/content-editor.tsx";

Deno.test("loadUrlVars", () => {
  const urlString = "https://example.com/?name=John%20Doe&returnPage=/about-us";
  const { name, returnPage } = loadUrlVars(urlString);
  const expected: Record<string, string> = {
    name: "John Doe",
    returnPage: "/about-us",
  };
  assertEquals({ name, returnPage }, expected);
});

Deno.test('loads variables correctly', (): void => {
  // Arrange
  const inputUrl = 'http://localhost/?name=Jane+Doe&returnPage=/contact-us';

  // Act
  const result = loadUrlVars(inputUrl);
  
  // Assert
  assertEquals(result.name, 'Jane Doe');
  assertEquals(result.returnPage, '/contact-us');
})
