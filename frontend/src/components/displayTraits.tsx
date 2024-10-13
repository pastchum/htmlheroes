import RadarChart from "./radarChart";
import { useUpload } from "@/context/UploadContext";

const languages = ["python", "javascript", "java"];
const frameworks = ["react", "next.js", "numpy", "pandas", "pytorch"];
const models = ["tensorflow", "cuda", "huggingface"];
const apis = ["aws", "ec2", "azure", "terraform", "databricks", "lambda"];
const domains = [
  "visualization",
  "research",
  "development",
  "deep learning",
  "analysis",
  "forecasting",
  "ment",
  "ics",
];

export default function DisplayTraits() {
  const { uploadResult } = useUpload();

  const traits: String[] = uploadResult.extracted_skills;

  const languageSkills = traits.filter((trait) =>
    languages.some((language) => trait.toLowerCase().includes(language))
  );
  console.log("languages: " + languageSkills);
  const frameworkSkills = traits.filter((trait) =>
    frameworks.some((framework) => trait.toLowerCase().includes(framework))
  );
  const modelSkills = traits.filter((trait) =>
    models.some((model) => trait.toLowerCase().includes(model))
  );
  const apiSkills = traits.filter((trait) =>
    apis.some((api) => trait.toLowerCase().includes(api))
  );
  const domainSkills = traits.filter((trait) =>
    domains.some((domain) => trait.toLowerCase().includes(domain))
  );
  const otherTraits = traits.filter(
    (trait) =>
      !(
        languageSkills.includes(trait) ||
        modelSkills.includes(trait) ||
        domainSkills.includes(trait) ||
        frameworkSkills.includes(trait) ||
        apiSkills.includes(trait)
      )
  );
  const skillsData = [
    languageSkills.length,
    modelSkills.length,
    frameworkSkills.length,
    apiSkills.length,
    otherTraits.length,
  ];

  return (
    <div className="m-2 px-5 py-2 text-teal-400 font-bold border-2 shadow rounded-xl w-full md:w-1/2 text-2xl">
      KEY TRAITS
      <div className="m-2 text-sm text-slate-400 flex-col flex h-[calc(65vh)] overflow-y-auto no-scrollbar">
        {/* domains */}
        {domainSkills.length > 0 && (
          <div className="p-2 pl-5 pb-5 border shadow rounded-xl mb-3">
            <div>
              <div className="m-2 text-xl text-teal-700">
                {" "}
                Applicable Fields
              </div>
              <div className="pl-5">
                {domainSkills.map((trait, index) => (
                  <li key={index}> {trait}</li>
                ))}
              </div>
            </div>
          </div>
        )}
        <RadarChart skillsData={skillsData} />

        {/* models */}
        {modelSkills.length > 0 && (
          <div className="p-2 pl-5 pb-5 border shadow rounded-xl mb-3">
            <div>
              <div className="m-2 text-xl text-teal-700"> Models</div>
              <div>
                {modelSkills.map((trait, index) => (
                  <li key={index}> {trait}</li>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* frameworks */}
        {frameworkSkills.length > 0 && (
          <div className="p-2 pl-5 pb-5 border shadow rounded-xl mb-3">
            <div>
              <div className="m-2 text-xl text-teal-700"> Frameworks</div>
              <div>
                {frameworkSkills.map((trait, index) => (
                  <li key={index}> {trait}</li>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* apis */}
        {apiSkills.length > 0 && (
          <div className="p-2 pl-5 pb-5 border shadow rounded-xl mb-3">
            <div>
              <div className="m-2 text-xl text-teal-700"> APIs</div>
              <div>
                {apiSkills.map((trait, index) => (
                  <li key={index}> {trait}</li>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* languages */}
        {languageSkills.length > 0 && (
          <div className="p-2 pl-5 pb-5 border shadow rounded-xl mb-3">
            <div>
              <div className="m-2 text-xl text-teal-700"> Languages</div>
              <div>
                {languageSkills.map((trait, index) => (
                  <li key={index}> {trait}</li>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* others */}
        {otherTraits.length > 0 && (
          <div className="p-2 pl-5 pb-5 border shadow rounded-xl mb-3">
            <div className="m-2 text-xl text-teal-700"> Others</div>
            {otherTraits.map((trait, index) => (
              <li key={index}> {trait}</li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
