import { Header } from '@/components/layout/Header';
import { getResumes } from '@/db/queries/resume';

import { ResumeListItem } from './_components/resume-li';

const HomePage = async () => {
  const resumes = await getResumes();
  return (
    <div className='min-h-dvh bg-muted/40 pt-16'>
      <Header />
      {/* THIS UI IS TEMPORARY!! */}
      <main className='mx-auto w-full max-w-screen-2xl p-4'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight'>Your resumes</h1>
        <ul>
          {resumes.map(resume => (
            <ResumeListItem key={resume.id} resume={resume} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
