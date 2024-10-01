import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Header } from '@/components/layout/Header';
import { getResumes } from '@/db/queries/resume';

import { ResumeList } from './_components/resume-list';

const HomePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['resumes'],
    queryFn: getResumes,
  });

  return (
    <div className='bg-muted/40 min-h-dvh pt-16'>
      <Header />
      {/* THIS UI IS TEMPORARY!! */}
      <main className='mx-auto w-full max-w-screen-2xl p-4 sm:px-8'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight'>Your resumes</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ResumeList />
        </HydrationBoundary>
      </main>
    </div>
  );
};

export default HomePage;
