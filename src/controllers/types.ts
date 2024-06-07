const TYPES = {
  UserController: Symbol.for("UserController"),
  UserService: Symbol.for("UserService"),
  TaskController: Symbol.for("TaskController"),
  TaskService: Symbol.for("TaskService"),
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
  AuthMiddleware: Symbol.for("AuthMiddleware"),
  FirestoreDb: Symbol.for("FirestoreDb"),
};

export { TYPES };
