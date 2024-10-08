import React from 'react'

function App() {
  return (
    <section className="h-full flex bg-slate-300 items-center justify-center">
      <div className="grid md:grid-cols-2 bg-white max-w-[350px] md:max-w-[580px] rounded-md gap-2">
        {/* Form */}
        <div className='p-4'>
          <form>
            <div className="flex justify-between">
              <h2 className='text-neutral-slate-900 font-[700] text-md'>Mortgage Calculator</h2>
              <button className='text-xs underline text-neutral-slate-700'>Clear all</button>
            </div>
          </form>
        </div>
        {/* Result */}
        <div className="bg-neutral-slate-900 rounded-bl-3xl rounded-tr-md rounded-br-md p-4">
          <h3 className="text-neutral-white">Your results</h3>
          <p className="text-neutral-slate-300">
            Your results are shown below based on the informtion you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
          <div>
            <div>
              <span>Your monthly repayments</span>
              <h1 className="text-primary-lime">₹1,797.74</h1>
            </div>
            <hr />
            <div>
              <p className="text-neutral-slate-300">
                Total you'll repay over the term
              </p>
              <span className="text-neutral-white">₹539,322.94</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App