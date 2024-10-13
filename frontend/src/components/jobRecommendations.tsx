import { useUpload } from "@/context/UploadContext";

export default function Recommendations() {
  const { uploadResult } = useUpload();
  const recommendations: any = uploadResult.recommendations[0];
  console.log(recommendations);
  const certifications: string[] = recommendations.certifications;
  const missingSkills: string[] = recommendations.missing_skills;

  return (
    <div className="m-2 px-5 py-2 text-teal-400 font-bold border-2 shadow rounded-xl w-full text-2xl">
      RECOMMENDATIONS
      <div className="text-lg mx-5 text-teal-700">
        <div className="my-2">
          Possible Jobs
          <div className="text-slate-500 text-sm">
            With your current profile, consider applying to the following jobs:
          </div>
          <div className="pl-5 text-sm text-slate-400">
            {certifications.map((cert, index) => (
              <li key={index}> {cert}</li>
            ))}
          </div>
        </div>

        <div className="my-2">
          Skills to Learn
          <div className="text-slate-500 text-sm">
            In order to best rectify your resume, here are the list of skills
            you should consider learning:
          </div>
          <div className="pl-5 text-sm text-slate-400">
            {missingSkills.map((trait, index) => (
              <li key={index}> {trait}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
