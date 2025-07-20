import { test, expect } from "bun:test";
import path from "node:path";

test("Windows path.resolve should not overflow buffer with long paths", () => {
  if (process.platform !== "win32") {
    // Skip on non-Windows platforms
    return;
  }

  // Create a very long path that could cause buffer overflow
  const longSegment = "a".repeat(1000);
  const veryLongPath = Array(100).fill(longSegment).join("\\");
  
  // This should not panic with index out of bounds
  expect(() => {
    path.resolve(veryLongPath);
  }).not.toThrow();
});

test("Windows path.resolve should handle multiple long paths", () => {
  if (process.platform !== "win32") {
    // Skip on non-Windows platforms  
    return;
  }

  // Create multiple long paths that when combined could exceed buffer
  const longSegment = "b".repeat(800);
  const paths = Array(10).fill(longSegment);
  
  // This should not panic with index out of bounds
  expect(() => {
    path.resolve(...paths);
  }).not.toThrow();
});

test("Windows path.resolve with UNC paths and long segments", () => {
  if (process.platform !== "win32") {
    // Skip on non-Windows platforms
    return;
  }

  // UNC path with very long components
  const longSegment = "c".repeat(1200);
  const uncPath = `\\\\server\\share\\${longSegment}\\${longSegment}`;
  
  // This should not panic with index out of bounds
  expect(() => {
    path.resolve(uncPath);
  }).not.toThrow();
});