import { assertEquals, assertExists } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import DFetch from '../mod.ts';

type DelayType = { delay: string };

Deno.test("DFetch.request", async () => {
  const { data } = await DFetch.request<DelayType>({
    url: "https://postman-echo.com/delay/2",
  });
  
  assertExists(data);
  assertEquals(data.delay, "2");
});

Deno.test("DFetch.get", async () => {
  const { data } = await DFetch.get<DelayType>(
    "https://postman-echo.com/delay/2"
  );

  assertExists(data);
  assertEquals(data.delay, "2");
});