import { AxePuppeteer } from '@axe-core/puppeteer';

const ignoredDefaults = ['document-title', 'html-has-lang'];

const buildAxeErrorOutput = violations =>
  violations
    .map(
      v =>
        `[${v.impact}] ${v.help}
Id: ${v.id}
See ${v.helpUrl}
${v.nodes.reduce((str, { html, target }) => [str, html, ...target].join('\n\n'), '')}`,
    )
    .join('\n') || null;

export async function axeCheck(page: any, additionalIgnored: string[] = []) {
  const ignoredRules = [...ignoredDefaults, ...additionalIgnored];
  const results = await new AxePuppeteer(page).disableRules(ignoredRules).analyze();

  const appropriateSeverity = results.violations.filter(violation => ['serious', 'critical'].includes(violation.impact));
  const axeError = buildAxeErrorOutput(appropriateSeverity);
  expect(axeError).toBe(null);
}
