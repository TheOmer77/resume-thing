import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { getResumes } from '@/db/queries/resume';

const HomePage = async () => {
  const resumes = await getResumes();
  return (
    <div className='min-h-dvh bg-muted/40 pt-16'>
      <Header />
      {/* THIS UI IS TEMPORARY!! */}
      <main className='mx-auto w-full max-w-screen-2xl p-4'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight'>Your resumes</h1>
        <ul>
          {resumes.map(({ id, title, updatedAt }) => (
            <li key={id} className='w-full'>
              <Button
                asChild
                variant='ghost'
                className='h-auto w-full flex-col items-start'
              >
                <Link href={`/view/${id}`}>
                  <span className='text-lg font-semibold'>{title}</span>
                  <span className='text-sm text-muted-foreground'>
                    Last updated{' '}
                    {updatedAt.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
