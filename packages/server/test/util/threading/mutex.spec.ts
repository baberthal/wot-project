//===- mutex.spec.ts - -  --------------------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Mutex } from "src/util/threading";

describe("Mutex", () => {
  let mutex: Mutex;
  beforeEach(() => {
    mutex = new Mutex();
  });

  test("unlocked by default", () => {
    expect(mutex.isLocked).toEqual(false);
  });

  describe("locking and unlocking", () => {
    let unlockedByNextLock = false;
    let instantTimedLockSuccess = false;

    beforeEach(() => {
      unlockedByNextLock = false;
      instantTimedLockSuccess = false;
    });

    test("timedLock", async () => {
      await mutex.timedLock(1).then(() => {
        instantTimedLockSuccess = true;
        mutex.unlock();
      });
      expect(instantTimedLockSuccess).toEqual(true);
    });

    test("locking an locked mutex", () => {
      expect(() => {
        mutex.unlock();
      }).toThrow("Can't unlock an unlocked mutex");
    });
  });

  describe("#timedLock", () => {});

  describe("#lock", () => {});

  describe("#unlock", () => {});
});
