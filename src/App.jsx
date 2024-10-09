import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [monthlyRepayment, setMonthlyRepayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  const calculateRepayment = (amount, term, interest) => {
    const monthlyRate = interest / 100 / 12;
    const numberOfPayments = term * 12;

    const monthlyPayment =
      (amount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    };
  };

  const onSubmit = (data) => {
    const { amount, term, interest } = data;

    if (amount && term && interest) {
      const { monthlyPayment, totalPayment } = calculateRepayment(
        parseFloat(amount),
        parseInt(term),
        parseFloat(interest)
      );

      setMonthlyRepayment(monthlyPayment);
      setTotalRepayment(totalPayment);
    }
  };

  const handleClear = () => {
    reset(); // Reset the form fields
    setMonthlyRepayment(null); // Clear monthly repayment
    setTotalRepayment(null); // Clear total repayment
  };

  return (
    <section className="h-full flex bg-slate-300 items-center justify-center">
      <div className="grid md:grid-cols-2 bg-white max-w-[350px] md:max-w-[600px] rounded-md gap-2">
        {/* Form */}
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-neutral-slate-900 font-[700] text-md">
              Mortgage Calculator
            </h2>
            <button
              type="button"
              className="text-xs underline text-neutral-slate-700"
              onClick={handleClear}
            >
              Clear all
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="relative">
              <label
                htmlFor="amount"
                className="text-neutral-slate-700 text-xs"
              >
                Mortgage Amount
              </label>
              <input
                type="number"
                {...register("amount", {
                  required: "Mortgage amount is required",
                })}
                className="w-full border p-1 rounded-md indent-8 outline-none focus:border-primary-lime"
              />
              <div className="py-1 rounded-l-md border px-2 left-0 top-6 bg-neutral-slate-100 absolute">
                <span className="text-neutral-slate-700 font-[500]">₹</span>
              </div>
              {errors.amount && (
                <span className="text-red-500 text-[8px]">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <label
                  htmlFor="term"
                  className="text-neutral-slate-700 text-xs"
                >
                  Mortgage Term
                </label>
                <input
                  type="number"
                  {...register("term", {
                    required: "Mortgage term is required",
                  })}
                  className="w-full border p-1 rounded-md outline-none focus:border-primary-lime"
                />
                <div className="py-1 rounded-r-md border px-2 right-0 top-6 bg-neutral-slate-100 absolute">
                  <span className="text-neutral-slate-700 font-[500]">
                    years
                  </span>
                </div>
                {errors.term && (
                  <span className="text-red-500 text-[8px]">
                    {errors.term.message}
                  </span>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="interest"
                  className="text-neutral-slate-700 text-xs"
                >
                  Interest Rate
                </label>
                <input
                  type="number"
                  {...register("interest", {
                    required: "Interest rate is required",
                  })}
                  className="w-full border p-1 rounded-md outline-none focus:border-primary-lime"
                />
                <div className="py-1 rounded-r-md border px-2 right-0 top-6 bg-neutral-slate-100 absolute">
                  <span className="text-neutral-slate-700 font-[500]">%</span>
                </div>
                {errors.interest && (
                  <span className="text-red-500 text-[8px]">
                    {errors.interest.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-neutral-slate-700 text-xs">
                Mortgage Type
              </label>
              <div
                className="border rounded p-2 flex items-center space-x-2 cursor-pointer focus:border-primary-lime"
                onClick={() => setValue("mortgageType", "repayment")}
              >
                <input
                  type="radio"
                  {...register("mortgageType")}
                  value="repayment"
                  id="repayment"
                  className="border"
                />
                <label
                  htmlFor="repayment"
                  className="text-neutral-slate-900 font-medium text-sm"
                >
                  Repayment
                </label>
              </div>
              <div
                className="border rounded p-2 flex items-center space-x-2 cursor-pointer focus:border-primary-lime"
                onClick={() => setValue("mortgageType", "interestOnly")}
              >
                <input
                  type="radio"
                  {...register("mortgageType")}
                  value="interestOnly"
                  id="interest"
                />
                <label
                  htmlFor="interest"
                  className="text-neutral-slate-900 font-medium text-sm"
                >
                  Interest Only
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center space-x-2 bg-primary-lime rounded-full px-2 py-2"
            >
              <span className="w-[9%]">
                <img
                  src="/assets/images/icon-calculator.svg"
                  alt="Calculator"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="text-xs font-medium">Calculate Repayments</span>
            </button>
          </form>
        </div>
        {/* Result */}
        <div className="bg-neutral-slate-900/80 rounded-bl-3xl rounded-tr-md flex items-center rounded-br-md p-4">
          {monthlyRepayment && totalRepayment ? (
            <div className="h-full flex flex-col gap-2">
              <h3 className="text-neutral-white">Your results</h3>
              <p className="text-neutral-slate-300 text-[0.7rem]">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>
              <div className="bg-neutral-slate-900 rounded-md border-t-2 border-primary-lime p-4 flex flex-col gap-2">
                <div>
                  <span className="text-neutral-slate-300 text-xs">
                    Your monthly repayments
                  </span>
                  <h1 className="text-primary-lime text-4xl font-bold ">
                    ₹{monthlyRepayment || "0.00"}
                  </h1>
                </div>
                <hr />
                <div>
                  <p className="text-neutral-slate-300 text-sm">
                    Total you'll repay over the term
                  </p>
                  <span className="text-neutral-white">
                    ₹{totalRepayment || "0.00"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-[50%]">
                <img
                  src="/assets/images/illustration-empty.svg"
                  alt="Calculator Illustration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-neutral-white font-bold">
                  Results shown here
                </h1>
                <p className="text-neutral-slate-300 text-[0.8rem] text-center">
                  Complete the form and click "Calculate Repayments" to see what
                  your monthly repayments would be.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
