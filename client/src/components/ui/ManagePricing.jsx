import { useState } from "react";

const ManagePricing = ({ subscription }) => {
  const [pricing, setPricing] = useState({
    monthly_price: subscription?.monthly_price || 0,
    discounted_monthly_price: subscription?.discounted_monthly_price || 0,
    yearly_price: subscription?.yearly_price || 0,
    discounted_yearly_price: subscription?.discounted_yearly_price || 0,
  });

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Subscription Pricing</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Monthly Price</label>
          <input
            type="number"
            value={pricing.monthly_price}
            onChange={(e) =>
              setPricing({ ...pricing, monthly_price: Number(e.target.value) })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Discounted Monthly Price</label>
          <input
            type="number"
            value={pricing.discounted_monthly_price}
            onChange={(e) =>
              setPricing({
                ...pricing,
                discounted_monthly_price: Number(e.target.value),
              })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Yearly Price</label>
          <input
            type="number"
            value={pricing.yearly_price}
            onChange={(e) =>
              setPricing({ ...pricing, yearly_price: Number(e.target.value) })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Discounted Yearly Price</label>
          <input
            type="number"
            value={pricing.discounted_yearly_price}
            onChange={(e) =>
              setPricing({
                ...pricing,
                discounted_yearly_price: Number(e.target.value),
              })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ManagePricing;
