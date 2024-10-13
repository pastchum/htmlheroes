import Recommendations from "./jobRecommendations";
import { useUpload } from "@/context/UploadContext";

export default function CareerPaths() {
  const { uploadResult } = useUpload();
  const path: string = uploadResult.predicted_job_role;
  const roles: string[] = uploadResult.potential_roles;

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
      <Recommendations />
    </div>
  );
}
