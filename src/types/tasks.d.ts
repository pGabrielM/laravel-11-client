export default interface TasksResponse {
  data: {
    data: {
      id: number;
      name: string;
      description: string;
      completed: boolean;
      created_by_user_id: number;
      created_at: string;
      updated_at: string;
    }[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number | null;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number | null;
      total: number;
    };
  };
}
