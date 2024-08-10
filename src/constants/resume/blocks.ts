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
        { icon: 'mail', text: 'email@domain.com' },
        { icon: 'phone', text: '(123) 456-7890' },
        { icon: 'location', text: 'Some City, NY' },
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
          icon: 'linkedin',
          text: 'LinkedIn',
          url: 'https://linkedin.com/in/example',
        },
        { icon: 'github', text: 'GitHub', url: 'https://github.com/ghost' },
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
      /* Normally a section wouldn't include the same child multiple times,
      but this is just a demo */
      children: [
        'dummy-exp-item',
        'dummy-exp-item',
        'dummy-exp-item',
        'dummy-exp-item',
        'dummy-exp-item',
      ],
    },
  },
  {
    id: 'dummy-exp-item',
    type: 'experience',
    content: {
      title: 'Job Title',
      location: 'Company Name',
      startDate: '2015-04',
      endDate: '2016-04',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius orci a nisl suscipit, et molestie ligula semper. Cras in bibendum augue. Phasellus lacinia a turpis a ullamcorper.',
    },
  },

  {
    id: 'dummy-edu',
    type: 'section',
    content: {
      title: 'Education',
      /* Normally a section wouldn't include the same child multiple times,
      but this is just a demo */
      children: ['dummy-edu-item', 'dummy-edu-item'],
    },
  },
  {
    id: 'dummy-edu-item',
    type: 'experience',
    content: {
      title: 'Course',
      location: 'Institution',
      startDate: '2015-04',
      endDate: '2016-04',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius orci a nisl suscipit, et molestie ligula semper. Cras in bibendum augue. Phasellus lacinia a turpis a ullamcorper.',
    },
  },

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
