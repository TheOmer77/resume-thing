import type { BlockData } from '@/types/blocks';

export const resumeBlocks = [
  /** Test block, to be removed */
  {
    id: 'md-test',
    type: 'text',
    content: {
      text: `Regular. **Bold.** *Italic.* ***Bold AND italic!*** ~~Strike this.~~ **~~Strike and also bold.~~** [Link to Google](https://www.google.com/)

- One
- Two
- Three

1. One
2. Two
3. Three`,
    },
  },

  {
    id: 'dummy-title',
    type: 'title',
    content: {
      title: 'Name Lastname',
      subtitle: 'Job Title',
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
    id: 'dummy-skills',
    type: 'text',
    content: {
      text: `
User Research \\
Design Sprints \\
Concept Design \\
Prototyping \\
Usability Testing \\
Design Systems \\
Agile Practices`,
    },
  },
  {
    id: 'dummy-tools',
    type: 'text',
    content: {
      text: `
Miro - FigJam \\
Figma - Penpot \\
Abstract \\
Maze / Usertesting \\
Webflow - Framer \\
Notion / GDocs \\
Zeroheight \\
Jira / Taiga`,
    },
  },
  {
    id: 'dummy-languages',
    type: 'text',
    content: {
      text: `
Spanish (Native) \\
English (Fluent)`,
    },
  },
] satisfies BlockData[];
