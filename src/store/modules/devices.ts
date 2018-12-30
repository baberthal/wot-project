//===- store/modules/devices.ts - Devices Store Module ---------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  BaseDeviceInfo,
  DeviceInfoResponse,
  getDevices
} from "@app/api/devices";

export interface DevicesState {
  all: BaseDeviceInfo[];
}

// Initial State
const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  getAllDevices({ commit }: any) {
    getDevices().then(devices => {
      console.log(devices);
      return commit("setDevices", devices);
    });
  }
};

const mutations = {
  setDevices(theState: DevicesState, response: DeviceInfoResponse) {
    const infoArray = [];
    for (const key in response) {
      infoArray.push(response[key]);
    }
    theState.all = infoArray;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
