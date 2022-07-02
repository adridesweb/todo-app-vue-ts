import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";

import { config } from "@vue/test-utils";

// create one router per test file
const router = createRouterMock();

global.beforeEach(() => {
  injectRouterMock(router);
});

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock);
