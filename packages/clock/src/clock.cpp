//===- clock.cpp - Clock Functions for Node -------------------*-  C++  -*-===//
//
// This source file is part of the clock open source project.
//
// Copyright (c) 2019 J. Morgan Lieberthal and the clock authors
// Licensed under Apache License, Version 2.0
//
//===----------------------------------------------------------------------===//

#include <errno.h>
#include <nan.h>
#include <node.h>
#include <string.h>
#include <sys/types.h>
#include <time.h>
#include <v8.h>

#define PCLOCK_THROW_ERROR(MSG) Nan::ThrowError((MSG))

#define PCLOCK_CHECK_CLOCKID(arg)                                              \
  if (!(arg)->IsInt32()) {                                                     \
    Nan::ThrowTypeError("Specified CLOCK_ID is not supported on this system"); \
    return;                                                                    \
  }

#define PCLOCK_FILL_TIMESPEC(Target, Sec, NSec)                               \
  (Target)->Set(Nan::New("sec").ToLocalChecked(), Nan::New<v8::Number>(Sec)); \
  (Target)->Set(Nan::New("nsec").ToLocalChecked(), Nan::New<v8::Number>(NSec));

#define PCLOCK_DEFINE_CONST(TGT, NAME, VAL) \
  (TGT)->Set(Nan::New(NAME).ToLocalChecked(), Nan::New(VAL))

#define PCLOCK_GET_CLOCKID(CLOCKID, INFO)                                    \
  do {                                                                       \
    PCLOCK_CHECK_CLOCKID(INFO);                                              \
    v8::Maybe<int32_t> maybe = (INFO)->Int32Value(Nan::GetCurrentContext()); \
    if (maybe.IsNothing()) {                                                 \
      Nan::ThrowError("'clockID' must be defined!");                         \
      return;                                                                \
    }                                                                        \
    (CLOCKID) = clockid_t(maybe.ToChecked());                                \
  } while (0)

#define PCLOCK_CHECKCALL(EXPR, FNAME)                             \
  do {                                                            \
    if ((EXPR) != 0) {                                            \
      if (errno == EINVAL) {                                      \
        Nan::ThrowTypeError(                                      \
            "Specified clock is not supported on this system.");  \
      } else {                                                    \
        Nan::ThrowError(Nan::ErrnoException(errno, (FNAME), "")); \
      }                                                           \
      return;                                                     \
    }                                                             \
  } while (0)

namespace {

void ClockGetTime(const Nan::FunctionCallbackInfo<v8::Value>& Info) {
  if (Info.Length() != 1) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  clockid_t ClockID;
  PCLOCK_GET_CLOCKID(ClockID, Info[0]);
  struct timespec Timespec;

  PCLOCK_CHECKCALL(clock_gettime(ClockID, &Timespec), "clock_gettime");

  v8::Local<v8::Object> Obj = Nan::New<v8::Object>();
  PCLOCK_FILL_TIMESPEC(Obj, Timespec.tv_sec, Timespec.tv_nsec);

  Info.GetReturnValue().Set(Obj);
}

void ClockGetTime_bigint(const Nan::FunctionCallbackInfo<v8::Value>& Info) {
  if (Info.Length() != 1) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  clockid_t ClockID;
  PCLOCK_GET_CLOCKID(ClockID, Info[0]);
  struct timespec Timespec;
  PCLOCK_CHECKCALL(clock_gettime(ClockID, &Timespec), "clock_gettime");

  int64_t NsecTotal =
      (int64_t(Timespec.tv_sec) * NSEC_PER_SEC) + Timespec.tv_nsec;
  v8::Local<v8::BigInt> BigTime =
      v8::BigInt::New(v8::Isolate::GetCurrent(), NsecTotal);

  Info.GetReturnValue().Set(BigTime);
}

void ClockGetRes(const Nan::FunctionCallbackInfo<v8::Value>& Info) {
  if (Info.Length() != 1) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  clockid_t ClockID;
  PCLOCK_GET_CLOCKID(ClockID, Info[0]);
  struct timespec Timespec;

  PCLOCK_CHECKCALL(clock_getres(ClockID, &Timespec), "clock_getres");

  v8::Local<v8::Object> Obj = Nan::New<v8::Object>();
  PCLOCK_FILL_TIMESPEC(Obj, Timespec.tv_sec, Timespec.tv_nsec);
  Info.GetReturnValue().Set(Obj);
}

void ClockGetRes_bigint(const Nan::FunctionCallbackInfo<v8::Value>& Info) {
  if (Info.Length() != 1) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  clockid_t ClockID;
  PCLOCK_GET_CLOCKID(ClockID, Info[0]);
  struct timespec Timespec;

  PCLOCK_CHECKCALL(clock_getres(ClockID, &Timespec), "clock_getres");

  int64_t NsecTotal =
      (int64_t(Timespec.tv_sec) * NSEC_PER_SEC) + Timespec.tv_nsec;
  v8::Local<v8::BigInt> Result =
      v8::BigInt::New(Info.GetReturnValue().GetIsolate(), NsecTotal);

  Info.GetReturnValue().Set(Result);
}

extern "C" void PClock_Init(v8::Handle<v8::Object> Exports) {
  Nan::SetMethod(Exports, "clock_gettime", ClockGetTime);
  Nan::SetMethod(Exports, "clock_getres", ClockGetRes);
  Nan::SetMethod(Exports, "clock_gettime_bigint", ClockGetTime_bigint);
  Nan::SetMethod(Exports, "clock_getres_bigint", ClockGetRes_bigint);

  PCLOCK_DEFINE_CONST(Exports, "REALTIME", CLOCK_REALTIME);
  PCLOCK_DEFINE_CONST(Exports, "MONOTONIC", CLOCK_MONOTONIC);
}

NODE_MODULE(pclock, PClock_Init);

}  // end namespace
