// Shared by the Server Action and the drawer. No runtime deps, so it is safe in the client bundle.
export type ContactField = "name" | "email" | "company" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | {
      status: "error";
      message?: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      values?: Partial<Record<ContactField, string>> & { services?: string[] };
    };

export const initialContactState: ContactState = { status: "idle" };
