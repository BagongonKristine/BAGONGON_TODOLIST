import create from 'zustand';

let currentId = 1;

export const useStore = create((set) => ({
  tasks: [],
  addTask: (text) => set((state) => ({ tasks: [...state.tasks, { id: currentId++, text }] })),
  deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  editTask: (id, newText) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    })),
}));
