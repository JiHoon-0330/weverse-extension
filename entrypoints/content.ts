import { weverseAPI } from "@/src/remote/weverse";

export default defineContentScript({
  matches: ["https://weverse.io/*"],
  main() {
    console.log("Hello content.");
    weverseAPI
      .fetchNotiFeedActivities()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  },
});
