declare global {
  namespace Express {
    interface User {
      id: number;
      // adicione outras propriedades do usuário aqui, se necessário
    }

    interface Request {
      user?: User;
    }
  }
}
