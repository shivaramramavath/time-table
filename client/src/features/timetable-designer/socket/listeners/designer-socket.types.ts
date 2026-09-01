export interface DeleteEvent {
  id: string;
}

export interface DesignerSocketEvents<T> {
  add: T;
  update: T;
  delete: DeleteEvent;
}
