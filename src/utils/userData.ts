import { faker } from '@faker-js/faker';
import { USER_STATUS_VALUES } from '@/constants';

export function formatDateJoined(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const h = date.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hour}:${min} ${ampm}`;
}

export function generateUserBatch(
  offset: number,
  count: number
): UserTypes.User[] {
  const batch: UserTypes.User[] = [];
  const startDate = new Date(2019, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 0; i < count; i++) {
    const index = offset + i + 1;
    const date = faker.date.between({ from: startDate, to: endDate });
    batch.push({
      id: `user-${index}`,
      organization: faker.company.name(),
      username:
        index % 3 === 0
          ? faker.person.fullName()
          : faker.internet.userName().toLowerCase().replace(/\s/g, ''),
      email: faker.internet.email(),
      phoneNumber: '0' + faker.string.numeric(10),
      dateJoined: formatDateJoined(date),
      status: faker.helpers.arrayElement(USER_STATUS_VALUES),
      hasLoan: faker.datatype.boolean({ probability: 0.6 }),
      hasSavings: faker.datatype.boolean({ probability: 0.5 }),
    });
  }

  return batch;
}
