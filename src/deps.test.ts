import { createPathRef, PathRef } from "./path.ts";

export {
  assert,
  assertEquals,
  assertMatch,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "https://deno.land/std@0.209.0/assert/mod.ts";
export { readerFromStreamReader } from "https://deno.land/std@0.209.0/streams/reader_from_stream_reader.ts";
export { writableStreamFromWriter } from "https://deno.land/std@0.209.0/streams/writable_stream_from_writer.ts";
export { serve } from "https://deno.land/std@0.209.0/http/server.ts";

/**
 * Creates a temporary directory, changes the cwd to this directory,
 * then cleans up and restores the cwd when complete.
 */
export async function withTempDir(action: (path: PathRef) => Promise<void> | void) {
  const originalDirPath = Deno.cwd();
  const dirPath = await Deno.makeTempDir();
  Deno.chdir(dirPath);
  try {
    await action(createPathRef(dirPath).resolve());
  } finally {
    try {
      await Deno.remove(dirPath, { recursive: true });
    } catch {
      // ignore
    }
    Deno.chdir(originalDirPath);
  }
}
