interface PathProps {
  path: String;
  roles: String[];
}

export default function CareerPaths({ path, roles }: PathProps) {
  return (
    <div className="m-2 px-5 py-2 text-teal-400 font-bold border-2 shadow rounded-xl w-full text-2xl">
      <div className="flex">
        BEST FIT <div className="pl-1 text-2xl text-slate-500">CAREER PATH</div>
      </div>
      <div>
        <div className="text-3xl text-teal-700">
          {path}
          <div className="text-lg p-2 px-3 text-slate-500">
            Possible Roles:
            {roles.map((role, index) => {
              return (
                <li key={index} className="text-sm text-slate-400">
                  {role}
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
