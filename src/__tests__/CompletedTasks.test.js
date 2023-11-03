import React from 'react';
import { render } from '@testing-library/react';
import CompletedTasks from '../components/CompletedTasks';

test('renders nothing when there are no completed tasks', () => {
  const { queryByText } = render(<CompletedTasks completedTasks={[]} />);
  expect(queryByText(/Completed Tasks/i)).toBeNull();
});


test('renders completed tasks properly', () => {
  const completedTasks = ['Task 1', 'Task 2'];
  const { getByText } = render(<CompletedTasks completedTasks={completedTasks} />);
  completedTasks.forEach(task => {
    expect(getByText(task)).toBeInTheDocument();
  });
});

test('does not render incomplete tasks', () => {
  const incompleteTasks = ['Task 3', 'Task 4'];
  const { queryByText } = render(<CompletedTasks completedTasks={incompleteTasks} />);
  incompleteTasks.forEach(task => {
    expect(queryByText(task)).toBeNull();
  });
});

test('matches previously recorded snapshot', () => {
  const completedTasks = ['Task 1', 'Task 2'];
  const { asFragment } = render(<CompletedTasks completedTasks={completedTasks} />);
  expect(asFragment()).toMatchSnapshot();
});
