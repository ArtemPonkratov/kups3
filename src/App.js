import { useState, useEffect, useRef } from "react";

// usePrevious: кастомный хук для получения предыдущего значения состояния или пропса.
function usePrevious(value) {
  // Используем ref для хранения предыдущего значения
  const ref = useRef();

  // После каждого рендера обновляем ref
  useEffect(() => {
    ref.current = value;
  });

  // Возвращаем предыдущее значение
  return ref.current;
}

// useToggle: кастомный хук для переключения булева значения (true/false).
function useToggle(initialValue = false) {
  // Состояние для хранения текущего значения
  const [value, setValue] = useState(initialValue);

  // Переключаем значение
  const toggle = () => setValue(!value);

  return [value, toggle];
}

// useInterval: кастомный хук для выполнения действия через определенные интервалы времени.
function useInterval(callback, delay) {
  // ref для хранения переданного callback
  const savedCallback = useRef();

  // Сохраняем последний переданный callback в ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Устанавливаем интервал и выполняем callback
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id); // Очищаем интервал при размонтировании или при изменении delay
    }
  }, [delay]);
}

function App() {
  // Состояние для хранения текущего значения счетчика
  const [count, setCount] = useState(0);

  // Используем кастомный хук useToggle для управления автоматическим увеличением
  const [isCounting, toggleIsCounting] = useToggle(false);

  // Получаем предыдущее значение счетчика
  const prevCount = usePrevious(count);

  // Используем useInterval для автоматического увеличения счетчика каждую секунду, когда isCounting === true
  useInterval(() => {
    if (isCounting) {
      setCount(count + 1);
    }
  }, 1000);

  return (
    <div>
      <h1>Текущее значение: {count}</h1>
      <h2>Предыдущее значение: {prevCount}</h2>
      <button onClick={() => setCount(count + 1)}>Увеличить на 1</button>
      <button onClick={toggleIsCounting}>
        {isCounting ? "Остановить" : "Начать"} авто-увеличение
      </button>
    </div>
  );
}

export default App;
