export function normalizePhones(input: string | null | undefined): string {
  if (!input) return '';
  const firstPhone = input
    .split(/[;,]/)[0] // лише перший номер
    .replace(/\D/g, ''); // видаляє всі символи, крім цифр

  if (firstPhone.length < 10 || firstPhone.length > 12) return ''; // фільтруємо сміття

  if (firstPhone.startsWith('380')) return firstPhone;
  if (firstPhone.startsWith('0')) return '38' + firstPhone;

  return '380' + firstPhone; // fallback, якщо номер починається без 0
}