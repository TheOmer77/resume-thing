import type { Resume } from '@/db/schema';

export const seedResumes = [
  {
    id: 'nng4lkdb6vi4jf66kxvxjt1x',
    title: 'Dummy Resume',
    author: 'Testy McTestface',
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] satisfies Resume[];
