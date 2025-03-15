interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string
  created_at: string
}

export const mockedProjects : GitHubRepo[] = [
  {
    id: -1,
    name: "ArduLogger",
    html_url: "https://github.com/AfterByte/ArduLogger",
    description: "A web application made with Flask and Arduino that uses the digital fingerprint sensor AS608 for login and signup",
    language: "Javascript",
    created_at: "2021-05-22T22:32:28Z"
  },
  {
    id: -2,
    name: "BattleShip-ColdWar",
    html_url: "https://github.com/AfterByte/BattleShip-ColdWar",
    description: "An Android BattleShip Game inspired on the Cold War for a School Project ",
    language: "Java",
    created_at: "2018-10-22T22:32:28Z"
  }
];