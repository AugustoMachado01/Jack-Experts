import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App"; // Atualize o caminho conforme necessário
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("fetches and displays tasks", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [{ id: 1, name: "Test Task" }],
  });

  render(<App />);

  await waitFor(() => screen.getByText(/Test Task/));
  expect(screen.getByText(/Test Task/)).toBeInTheDocument();
});
