import { Button } from "./components/button";

function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <ul className="flex gap-4">
        <Button variant="primary">Primary</Button>

        <Button variant="secondary">Secondary</Button>

        <Button variant="primary" as="a" href="#">
          Link
        </Button>
      </ul>
    </main>
  );
}

export default App;
