/**
 * Lightweight analytics helper.
 *
 * No third-party script is loaded. To enable analytics, add your
 * provider (e.g. Plausible, GA4) in the root layout and adapt the
 * `send` function below — events are already dispatched with
 * consistent names: resume_click, github_click, linkedin_click,
 * email_click, project_open, case_study_open, view_work, lets_connect.
 */

type AnalyticsEvent =
  | "resume_click"
  | "github_click"
  | "linkedin_click"
  | "email_click"
  | "project_open"
  | "case_study_open"
  | "view_work"
  | "lets_connect";

export function trackEvent(
  name: AnalyticsEvent,
  properties?: Record<string, string>
): void {
  if (typeof window === "undefined") return;

  const send = (payload: object) => {
    // Plausible-style analytics if loaded
    const plausible = (window as unknown as Record<string, unknown>).plausible;
    if (typeof plausible === "function") {
      (plausible as (event: string, opts?: object) => void)(name, {
        props: properties,
      });
    }
    // Generic push to a dataLayer for GA/GTM-style setups
    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    dataLayer?.push({ event: name, ...payload });
  };

  send({ ...properties });
}
