import type { BlockData } from '@/types/blocks';

export const resumeBlocks = [
  {
    id: 'dummy-title',
    type: 'title',
    content: {
      title: 'Name Lastname',
      subtitle: 'Job Title',
    },
  },
  {
    id: 'dummy-contact',
    type: 'contactInfo',
    content: {
      items: [
        { type: 'mail', text: 'email@domain.com' },
        { type: 'phone', text: '(123) 456-7890' },
        { type: 'location', text: 'Some City, NY' },
      ],
    },
  },
  {
    id: 'dummy-links',
    type: 'contactInfo',
    content: {
      orientation: 'horizontal',
      items: [
        {
          type: 'linkedin',
          text: 'LinkedIn',
          url: 'https://linkedin.com/in/example',
        },
        { type: 'github', text: 'GitHub', url: 'https://github.com/ghost' },
      ],
    },
  },

  {
    id: 'dummy-summary',
    type: 'text',
    content: {
      text: 'In dui lectus, molestie lacinia lectus et, elementum fringilla lorem. Morbi elementum massa a erat finibus commodo. Duis id porttitor tortor. Praesent mauris ipsum, mattis nec pretium nec, semper convallis nisl. Aliquam vulputate iaculis dui eu blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
      lead: true,
    },
  },

  {
    id: 'dummy-exp',
    type: 'section',
    content: {
      title: 'Experience',
      children: [...Array(5).keys()].map(key => `dummy-exp-item-${key}`),
    },
  },
  ...[...Array(5).keys()].map(
    (key, _, arr) =>
      ({
        id: `dummy-exp-item-${key}`,
        type: 'experience',
        content: {
          title: 'Job Title',
          location: `Company ${arr.length - key}`,
          startDate: `${2020 + (arr.length - key - 1)}-12`,
          endDate: `${2021 + (arr.length - key - 1)}-12`,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius orci a nisl suscipit, et molestie ligula semper. Cras in bibendum augue. Phasellus lacinia a turpis a ullamcorper.',
        },
      }) satisfies BlockData
  ),

  {
    id: 'dummy-edu',
    type: 'section',
    content: {
      title: 'Education',
      children: [...Array(2).keys()].map(key => `dummy-edu-item-${key}`),
    },
  },
  ...[...Array(2).keys()].map(
    (key, _, arr) =>
      ({
        id: `dummy-edu-item-${key}`,
        type: 'experience',
        content: {
          title: `Course ${arr.length - key}`,
          location: 'Institution',
          startDate: `${2018 + (arr.length - key - 1)}-05`,
          endDate: `${2019 + (arr.length - key - 1)}-05`,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius orci a nisl suscipit, et molestie ligula semper. Cras in bibendum augue. Phasellus lacinia a turpis a ullamcorper.',
        },
      }) satisfies BlockData
  ),

  {
    id: 'dummy-skills',
    type: 'section',
    content: {
      title: 'Skills',
      children: ['dummy-skills-content'],
    },
  },
  {
    id: 'dummy-skills-content',
    type: 'text',
    content: {
      text: `
- User Research
- Design Sprints
- Concept Design
- Prototyping
- Usability Testing
- Design Systems
- Agile Practices`,
    },
  },

  {
    id: 'dummy-tools',
    type: 'section',
    content: {
      title: 'Tools',
      children: ['dummy-tools-content'],
    },
  },
  {
    id: 'dummy-tools-content',
    type: 'text',
    content: {
      text: `
- Miro - FigJam
- Figma - Penpot
- Abstract
- Maze / Usertesting
- Webflow - Framer
- Notion / GDocs
- Zeroheight
- Jira / Taiga`,
    },
  },

  {
    id: 'dummy-languages',
    type: 'section',
    content: {
      title: 'Languages',
      children: ['dummy-languages-content'],
    },
  },
  {
    id: 'dummy-languages-content',
    type: 'text',
    content: {
      text: `
- Spanish (Native)
- English (Fluent)`,
    },
  },
] satisfies BlockData[];
