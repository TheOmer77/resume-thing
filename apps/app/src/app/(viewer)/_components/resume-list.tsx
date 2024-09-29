'use client';

import { useResumes } from '@/hooks/useResumes';

import { ResumeListItem } from './resume-list-item';

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
