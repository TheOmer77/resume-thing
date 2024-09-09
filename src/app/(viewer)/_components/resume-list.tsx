'use client';

import { ResumeListItem } from './resume-list-item';
import { useResumes } from '@/hooks/useResumes';

export const ResumeList = () => {
  const { resumes } = useResumes();
  return (
    <ul>
      {resumes?.map(resume => (
        <ResumeListItem key={resume.id} resume={resume} />
      ))}
    </ul>
  );
};
