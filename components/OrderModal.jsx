"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

export default function OrderModal({
  isOpen,
  onClose,
  product,
  selectedItem,
  selectedGroup,
  qty,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    pincode: "",
    area: "",
    city: "",
    state: "Kerala",
    landmark: "",
    address: "",
  });
  const router = useRouter();

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.phone.trim() || form.phone.length < 10)
      newErrors.phone = "Enter a valid 10-digit number";
    if (!form.pincode.trim() || form.pincode.length < 6)
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!form.area.trim()) newErrors.area = "Location / Area is required";
    if (!form.city.trim()) newErrors.city = "City / District is required";
    if (!form.state) newErrors.state = "Please select a state";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const imageUrl = selectedItem?.image
      ? `${window.location.origin}${selectedItem.image}`
      : "";

    const deliveryCharge = Number(product?.delivery_charge || 0);
    const productTotal = selectedItem?.price * qty;
    const finalTotal = productTotal + deliveryCharge;

    const message = `
 *New Order*

*Product Details*
----------------------------

Product: ${product?.title}
Variant: ${imageUrl}
Size: ${selectedGroup?.size || "N/A"}
Variant Price: ₹${selectedItem?.price}
Quantity: ${qty}
${deliveryCharge > 0 ? `Delivery Charge: ₹${deliveryCharge}` : `Delivery: Free`}
Grand Total: ₹${finalTotal}


*Delivery Address*
-------------------------------

Name: ${form.name}
Phone: ${form.phone}${form.altPhone ? `\n📞 Alt Phone: ${form.altPhone}` : ""}
Pincode: ${form.pincode}
Area: ${form.area}
City: ${form.city}
State: ${form.state}${form.landmark ? `\n🏛️ Landmark: ${form.landmark}` : ""}${form.address ? `\n🏠 Address: ${form.address}` : ""}
`.trim();

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918075261678?text=${encoded}`, "_blank");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const handleClose = () => {
    setForm({
      name: "",
      phone: "",
      altPhone: "",
      pincode: "",
      area: "",
      city: "",
      state: "Kerala",
      landmark: "",
      address: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-7 pt-7 pb-5">
          <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              Delivery Address
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Where should we deliver?
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100 mx-7" />

        {/* Form */}
        <div className="px-7 pt-5 pb-6 grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Full Name <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100
                ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Mobile Number <span className="text-teal-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              maxLength={10}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100
                ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Alt Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Alt Phone
            </label>
            <input
              type="tel"
              name="altPhone"
              value={form.altPhone}
              onChange={handleChange}
              placeholder="Optional"
              maxLength={10}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Pincode */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Pincode <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              maxLength={6}
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100
                ${errors.pincode ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.pincode && (
              <p className="text-xs text-red-500">{errors.pincode}</p>
            )}
          </div>

          {/* Location / Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Location / Area <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Locality, area"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 text-black  outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100
                ${errors.area ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.area && (
              <p className="text-xs text-red-500">{errors.area}</p>
            )}
          </div>

          {/* City / District */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              City / District <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City or district"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100
                ${errors.city ? "border-red-400 bg-red-50" : "border-gray-200"}`}
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              State <span className="text-teal-500">*</span>
            </label>
            <div className="relative">
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 text-black outline-none transition-all appearance-none cursor-pointer pr-9
                  focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100
                  ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200"}`}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 fill-gray-400 pointer-events-none"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            {errors.state && (
              <p className="text-xs text-red-500">{errors.state}</p>
            )}
          </div>

          {/* Landmark */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="Near landmark (optional)"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Full Address */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Full Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House / Flat / Building details (optional)"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-black outline-none transition-all
                focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="px-7 pb-7 flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-teal-100"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.77.466 3.511 1.344 5.043L2.004 22l5.07-1.326A9.962 9.962 0 0012.004 22C17.52 22 22 17.514 22 12.004 22 6.486 17.52 2 12.004 2z" />
            </svg>
            Continue to Payment
          </button>
          <button
            onClick={handleClose}
            className="px-5 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-sm transition-all duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
