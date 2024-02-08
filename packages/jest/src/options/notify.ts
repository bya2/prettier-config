import type { Config } from "jest";

type NotifyMode =
  | "always"
  | "failure"
  | "success"
  | "change"
  | "success-change"
  | "failure-change";

/**
 * 테스트 결과에 대한 기본 OS 알림을 활성화
 * @param mode
 */
export default function notify(mode: NotifyMode = "failure-change"): Config {
  return {
    notify: true,
    notifyMode: mode,
  };
}
