import { api } from "../core/client/axios";

const getMain = document.querySelector(".main") as HTMLDivElement;
const getForm = document.querySelector(".form");
const getInput = document.querySelector(".input") as HTMLInputElement;
const getHead = document.querySelector(".github-user") as HTMLHeadElement;

interface GithubResponse {
  name: string;
}

function errorShake() {
  getHead.innerHTML = `try again...`;
  getMain.classList.add("error-shake");

  setTimeout(() => {
    getMain.classList.remove("error-shake");
  }, 1000);
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
      errorShake();
      console.error(error);
    } finally {
      getInput.value = "";
    }
  });
}

async function bootstrap(): Promise<void> {
  getInput.focus();
  void submitForm();
}
void bootstrap();
