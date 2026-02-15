export type UserStatus = 'active' | 'inactive' | 'pending' | 'blacklisted';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
}

const ORGANIZATIONS = ['Lendsqr', 'Irorun', 'Lendstar', 'Cashville', 'Fintech Hub'];
const FIRST_NAMES = ['Adedeji', 'Debby', 'Grace', 'Tosin', 'Chijioke', 'Amara', 'Folake', 'Emeka', 'Ngozi', 'Oluwaseun', 'Chioma', 'Ibrahim', 'Amina', 'Yusuf', 'Fatima', 'Kofi', 'Akua', 'Kwame', 'Adwoa', 'Esi'];
const LAST_NAMES = ['Ogana', 'Effiom', 'Adewale', 'Okonkwo', 'Nnamdi', 'Okafor', 'Ibe', 'Eze', 'Obi', 'Okoli', 'Nwosu', 'Adeyemi', 'Oladipo', 'Bello', 'Musa', 'Mensah', 'Asante', 'Owusu', 'Kwarteng', 'Sarpong'];
const DOMAINS = ['lendsqr.com', 'irorun.com', 'lendstar.com', 'cashville.com', 'fintechhub.com'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hour}:${min} ${ampm}`;
}

function phoneNumber(): string {
  return '0' + [7, 8, 9][Math.floor(Math.random() * 3)] + String(Math.floor(100000000 + Math.random() * 900000000));
}

function generateUsers(count: number): User[] {
  const statuses: UserStatus[] = ['active', 'inactive', 'pending', 'blacklisted'];
  const usedEmails = new Set<string>();
  const users: User[] = [];
  const startDate = new Date(2019, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 0; i < count; i++) {
    const org = randomItem(ORGANIZATIONS);
    const first = randomItem(FIRST_NAMES);
    const last = randomItem(LAST_NAMES);
    const baseUsername = (first + last).toLowerCase().replace(/\s/g, '') + (i % 5 === 0 ? String(i) : '');
    const domain = randomItem(DOMAINS);
    let email = `${baseUsername}@${domain}`;
    let tries = 0;
    while (usedEmails.has(email) && tries < 20) {
      email = `${baseUsername}${tries}@${domain}`;
      tries++;
    }
    usedEmails.add(email);

    users.push({
      id: `user-${i + 1}`,
      organization: org,
      username: i % 3 === 0 ? `${first} ${last}` : baseUsername,
      email,
      phoneNumber: phoneNumber(),
      dateJoined: randomDate(startDate, endDate),
      status: randomItem(statuses),
    });
  }

  return users;
}

export const MOCK_USERS = generateUsers(100);
