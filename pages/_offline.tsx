/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <div className="bg-white flex flex-col justify-center h-screen">
        <div className="flex flex-col justify-center min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="max-w-max mx-auto">
            <main className="sm:flex">
              <p className="text-4xl font-extrabold text-slate-600 sm:text-5xl">
                Offline
              </p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6 w-96">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Connection lost
                  </h1>
                  <p className="mt-1 whitespace-wrap text-base text-gray-500">
                    {`Your device might be offline. In any case, we'll keep trying to re-connect to MYX Labs.`}
                  </p>
                  <a
                    href="https://myx.yan.gg/status"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      type="button"
                      className="inline-flex mt-5 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm disabled:bg-slate-200"
                    >
                      API status
                    </button>
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
