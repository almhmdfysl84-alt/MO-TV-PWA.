import test from "node:test";
import assert from "node:assert/strict";
import { normalizeObservedItems, readObservedPageCount, ostoraIntegrationStatus } from "./normalize.mjs";

test("normalizes observed item metadata without inventing playback URLs", () => {
  const result = normalizeObservedItems({
    data: {
      items: [{ id: 17, cat: 4, name: "قناة تجريبية", image: "https://example.com/logo.png", adp: "opaque" }]
    }
  });
  assert.deepEqual(result[0], {
    sourceId: "17",
    name: "قناة تجريبية",
    categoryId: "4",
    image: "https://example.com/logo.png",
    adp: "opaque"
  });
  assert.equal("stream_url" in result[0], false);
});

test("rejects an unexpected response shape", () => {
  assert.throws(() => normalizeObservedItems({ data: {} }), /data.items/);
});

test("reads pagination when present and safely handles missing pagination", () => {
  assert.equal(readObservedPageCount({ data: { pagination: { pages: "5" } } }), 5);
  assert.equal(readObservedPageCount({ data: {} }), null);
});

test("integration remains disabled", () => {
  assert.equal(ostoraIntegrationStatus.enabled, false);
  assert.equal(ostoraIntegrationStatus.networkEnabled, false);
});
