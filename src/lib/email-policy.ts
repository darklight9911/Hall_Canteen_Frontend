/** Only DIU institutional emails are accepted (apex + subdomains). */
export const ALLOWED_EMAIL_DOMAIN = "diu.edu.bd";

export const EMAIL_POLICY_MESSAGE = `Only @${ALLOWED_EMAIL_DOMAIN} emails are accepted`;

export function isAllowedEmail(email: string): boolean {
  const domain = email.split("@").pop()?.trim().toLowerCase() ?? "";
  return domain === ALLOWED_EMAIL_DOMAIN || domain.endsWith(`.${ALLOWED_EMAIL_DOMAIN}`);
}
