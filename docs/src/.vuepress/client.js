import { defineClientConfig } from "@vuepress/client";
import VaryUI from "../../../src";
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(VaryUI);
  },
  setup() {},
  rootComponents: [],
});
