import { renderHook, act } from '@testing-library/react-hooks';
import useTask from '../hooks/useTask';

test('loads tasks from local storage', () => {
  const { result } = renderHook(() => useTask());
  expect(result.current.tasks).toEqual([]);

  // You may simulate the local storage setting here and verify the tasks are loaded.
});

test('adds a new task', () => {
  const { result } = renderHook(() => useTask());
  const taskText = 'New Task';

  act(() => {
    result.current.addTask(taskText);
  });

  expect(result.current.tasks).toContain(taskText);
});

test('toggles the state of a task', () => {
  const { result } = renderHook(() => useTask());
  const taskText = 'Task to toggle';

  act(() => {
    result.current.addTask(taskText);
  });

  act(() => {
    result.current.toggleTask(taskText);
  });

  expect(result.current.tasks.find(task => task.text === taskText).completed).toBe(true);
});

test('deletes a task', () => {
  const { result } = renderHook(() => useTask());
  const taskText = 'Task to delete';

  act(() => {
    result.current.addTask(taskText);
  });

  act(() => {
    result.current.deleteTask(taskText);
  });

  expect(result.current.tasks).not.toContain(taskText);
});
