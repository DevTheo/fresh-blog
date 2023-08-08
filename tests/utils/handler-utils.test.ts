import { assertEquals } from "https://deno.land/std@0.139.0/testing/asserts.ts";
import { redirectToAbsoluteOrRelative } from "../../utils/handler-utils.ts";

Deno.test("redirectToAbsoluteOrRelative with relative", () => {
  const relativeUrl = "/about-us";

  const result = redirectToAbsoluteOrRelative(relativeUrl);

  assertEquals(result.status, 307);
  //assertEquals(result.headers, null);
  assertEquals(result.headers.get("Location"), relativeUrl);

});

Deno.test("redirectToAbsoluteOrRelative with absolute", () => {
    const absoluteUrl = "https://example.com/contact-us";
  
    const result = redirectToAbsoluteOrRelative(absoluteUrl);
  
    assertEquals(result.status, 307);
    //assertEquals(result.headers, null);
    assertEquals(result.headers.get("Location"), absoluteUrl);
  
  //   assertEquals(redirectToAbsoluteOrRelative(absoluteUrl), absoluteUrl);
  //   assertEquals(redirectToAbsoluteOrRelative(otherUrl), otherUrl);
  });
  
  