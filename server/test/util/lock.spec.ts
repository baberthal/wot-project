//===- lock.spec.ts - Lock Spec --------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Lock } from "src/util/lock";

describe("Lock", () => {
  let lock: Lock;
  const N = 100;
  beforeEach(() => {
    lock = new Lock();
  });

  describe("#acquire", () => {
    it("acquires the lock", async () => {
      let count = 0;
      for (let i = 0; i < N; i++) {
        await lock.acquire();
        count += 1;
        lock.release();
      }

      expect(count).toEqual(N);
    });

    describe("when the lock is held", () => {
      let held: string;

      beforeEach(async () => {
        await lock.acquire();
        held = "i am held!";
        setTimeout(() => {
          lock.release();
        }, 500);
      });

      it("waits for the lock to be released", async () => {
        await lock.acquire();
        expect(held).toEqual("i am held!");
        lock.release();
      });
    });
  });

  describe("#withLock", () => {
    it("locks the lock, then releases it", async () => {
      let count = 0;
      for (let i = 0; i < N; i++) {
        await lock.withLock(() => {
          count += 1;
        });
      }
      expect(count).toEqual(N);
    });

    it("returns the value the callback returns", async () => {
      const res = await lock.withLock(() => "Hello");
      expect(res).toEqual("Hello");
    });
  });
});
