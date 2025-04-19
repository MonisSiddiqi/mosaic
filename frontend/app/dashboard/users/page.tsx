import { UsersTable } from "./-components/table/users-table";

export default function UsersPage() {
  return (
    <>
      <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
        <UsersTable />
      </div>
    </>
  );
}
