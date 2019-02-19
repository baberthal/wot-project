// Tests

const clock = require("..");

const CLOCK_TYPES = ["REALTIME", "MONOTONIC"];

describe("clock", () => {
  describe("constants", () => {
    test("has REALTIME", () => {
      expect(clock.REALTIME).toBeDefined();
      expect(typeof clock.REALTIME).toBe("number");
    });

    test("has MONOTONIC", () => {
      expect(clock.MONOTONIC).toBeDefined();
      expect(typeof clock.MONOTONIC).toBe("number");
    });
  });

  describe.each(CLOCK_TYPES)(".gettime(%s)", id => {
    test("returns a valid timespec", () => {
      const res = clock.gettime(clock[id]);
      expect(res.sec).toBeDefined();
      expect(res.nsec).toBeDefined();
    });
  });

  describe.each(CLOCK_TYPES)(".gettime.bigint(%s)", id => {
    test("returns a bigint", () => {
      const res = clock.gettime.bigint(clock[id]);
      console.log("RESULT: ", res);
      expect(typeof res).toEqual("bigint");
    });
  });

  describe.each(CLOCK_TYPES)(".getres(%s)", id => {
    test("returns a valid timespec", () => {
      const res = clock.getres(clock[id]);
      expect(res.sec).toBeDefined();
      expect(res.nsec).toBeDefined();
    });
  });

  describe.each(CLOCK_TYPES)(".getres.bigint(%s)", id => {
    test("returns a bigint", () => {
      const res = clock.getres.bigint(clock[id]);
      expect(typeof res).toBe("bigint");
    });
  });
});
