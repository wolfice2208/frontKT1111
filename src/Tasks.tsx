import { useEffect, useState } from "react";

interface Category {
    name: string;
    color: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  is_completed?: boolean;
  category: Category;
}

const API = import.meta.env.VITE_API_URL;

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`${API}/tasks/`)
      .then((r) => r.json())
      .then(setTasks);
  }, []);

  async function addItem() {
    const res = await fetch(`${API}/tasks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Date.now(), title: "Test", description: "ben", category: {name: "Работа", color: "blue"}, internal_note: "benebene" }),
    });
    const created = await res.json();
    setTasks((prev) => [...prev, created]);
  }

  return (
    <div>
      <button onClick={addItem}>Добавить</button>
      <div className="tasks">
        {tasks.map((i) => (
          <div className="task" key={i.id}>
            <p>{i.title}</p>
            <p>{i.description}</p>
            <p style={{color:i.category.color}}>Категория: {i.category.name}</p>
            <p>{i.is_completed ? "Выполнено" : "Не выполнено"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}