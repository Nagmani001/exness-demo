interface UserData {
  email: string,
  password: string,
  balance: {
    [key: string]: {
      [key: string]: string
    }
  }
}
export const IN_MEMORY: UserData[] = [];

