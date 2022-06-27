import React from 'react';
import TaskList from './TaskList';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as TaskStories from './Task.stories';
import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved
} from '@storybook/testing-library';


export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
} as ComponentMeta<typeof TaskList>;

const Template: ComponentStory<typeof TaskList> = args => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in Task.stories.js.
  tasks: [
    { ...TaskStories.Default.args!.task!, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args!.task!, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args!.task!, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args!.task!, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args!.task!, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args!.task!, id: '6', title: 'Task 6' },
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...Default.args!.tasks!.slice(0, 5),
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};

Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  console.log('canvas', canvas);
  // Waits for the component to transition from the loading state
  // await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
  await fireEvent.click(await canvas.findByTestId('loading'));
  // Waits for the component to be updated based on the store
  // await waitFor(async () => {
  //   // Simulates pinning the first task
  //   await fireEvent.click(canvas.getByLabelText('pinTask-1'));
  //   // Simulates pinning the third task
  //   await fireEvent.click(canvas.getByLabelText('pinTask-3'));
  // });
};