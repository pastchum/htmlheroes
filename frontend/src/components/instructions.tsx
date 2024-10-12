export default function Instructions() {
  return (
    <div className="p-3 w-full h-full border rounded-xl mx-5 shadow relative">
      <div className="m-5">
        <div className="border shadow-xl rounded-xl px-5 pt-5 pb-2">
          <div className="text-teal-700 text-3xl font-bold">
            Step 1. <div className="text-slate-700">Upload your resume. </div>
          </div>

          <div className="text-slate-500 m-4 mx-5">
            Let our ML model analyse your resume.
          </div>
        </div>
        <div className="border shadow-xl rounded-xl px-5 pt-5 pb-2 mt-5">
          <div className="text-teal-700 text-3xl font-bold">
            Step 2.<div className=" text-slate-700">Get your results.</div>
          </div>
          <div className="text-slate-500 mx-5 m-4">
            Find out how you can improve your skills and resume to set yourself
            apart from everyone else!
          </div>
        </div>
        <div className="border shadow-xl rounded-xl px-5 pt-5 pb-2 mt-5">
          <div className="text-teal-700 text-3xl font-bold">
            Step 3.<div className=" text-slate-700">Profit.</div>
          </div>
          <div className="text-slate-500 mx-5 m-4">Get your dream job!</div>
        </div>
      </div>
    </div>
  );
}
