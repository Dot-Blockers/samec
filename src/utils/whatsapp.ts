export const SAMEC_WHATSAPP_NUMBER = '923474623101';
export const SAMEC_WHATSAPP_DISPLAY = '+92 347 4623101';

export function buildWhatsAppUrl(message?: string): string {
  const defaultMsg =
    'Hello Engr. Muhammad Saqib Rafiq, I would like to discuss a construction / engineering project with SAMEC Consultants & Engineers.';
  const text = encodeURIComponent(message?.trim() || defaultMsg);
  return `https://wa.me/${SAMEC_WHATSAPP_NUMBER}?text=${text}`;
}
