import { api } from "../core/client/axios";

const getForm = document.querySelector(".form");
const getInput = document.querySelector(".input") as HTMLInputElement;
const getHead = document.querySelector(".github-user") as HTMLHeadElement;

interface GithubResponse {
  name: string;
}

async function submitForm(): Promise<void> {
  getForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.get<GithubResponse>(getInput.value);

      const { name } = data;

      if (name === null || name === undefined)
        throw new Error("Name not found");

      getHead.innerHTML = `Hello ${name}`;
    } catch (error) {
      getHead.innerHTML = `try again...`;
      console.error(error);
    } finally {
      getInput.value = "";
    }
  });
}

async function bootstrap(): Promise<void> {
  void submitForm();
}
void bootstrap();
