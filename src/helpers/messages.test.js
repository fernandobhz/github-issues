import { helloWorld } from "./messages";

test("hello world", () => {
  expect(helloWorld).toBe("Hello World");
});
