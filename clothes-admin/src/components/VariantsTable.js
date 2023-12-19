import { useState } from "react";
import * as Yup from "yup";

const VariantsTable = ({ variants, setVariants }) => {
  const [newVariant, setNewVariant] = useState({
    sku: "",
    size: "",
    color: "",
    price: "",
    qty: "",
  });
  const [error, setError] = useState("");

  const variantSchema = Yup.object().shape({
    size: Yup.string().required("Size is required"),
    color: Yup.string().required("Color is required"),
    price: Yup.number()
      .typeError("Please enter correct value in price field")
      .positive("Please enter correct value in price field")
      .integer("Please enter correct value in price field")
      .required("Price is required"),
    qty: Yup.number()
      .typeError("Quantity is required")
      .positive("Quantity is required")
      .integer("Quantity is required")
      .required("Quantity is required"),
  });

  const handleInputChange = (e, field) => {
    setNewVariant({ ...newVariant, [field]: e.target.value });
  };

  const addVariant = (e) => {
    e.preventDefault();
    variantSchema
      .validate(newVariant)
      .then(() => {
        const lowerCasedVariant = {
          ...newVariant,
          price: Number(newVariant.price),
          qty: Number(newVariant.qty),
          size: newVariant.size.toLowerCase(),
          color: newVariant.color.toLowerCase(),
        };

        if (isDuplicate(lowerCasedVariant)) {
          setError("Variant already exists");
        } else {
          const variantWithIdAndSku = {
            ...lowerCasedVariant,
            sku: `sku-${newVariant.size.toLowerCase()}-${newVariant.color.toLowerCase()}-${
              newVariant.price
            }-${newVariant.qty}`,
          };
          setVariants([...variants, variantWithIdAndSku]);
          setNewVariant({
            sku: "",
            size: "",
            color: "",
            price: "",
            qty: "",
          });
          setError("");
        }
      })
      .catch((validationError) => {
        setError(validationError.message);
      });
  };

  const isDuplicate = (variant) => {
    return variants.some(
      (v) =>
        v.size.toLowerCase() === variant.size.toLowerCase() &&
        v.color.toLowerCase() === variant.color.toLowerCase()
    );
  };

  const deleteVariant = (e, index) => {
    e.preventDefault();
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  return (
    <>
      <label className="font-medium">Product Variants *</label>
      <div className="p-4 md:p-8">
        <div className="mb-4 max-lg:grid gap-5">
          <input
            type="text"
            placeholder="Size *"
            value={newVariant.size}
            onChange={(e) => handleInputChange(e, "size")}
            className="border p-2 mr-2 max-lg:w-full lg:mb-2"
          />
          <input
            type="text"
            placeholder="Color *"
            value={newVariant.color}
            onChange={(e) => handleInputChange(e, "color")}
            className="border p-2 mr-2 max-lg:w-full lg:mb-2"
          />
          <input
            type="number"
            placeholder="Price *"
            value={newVariant.price}
            onChange={(e) => handleInputChange(e, "price")}
            className="border p-2 mr-2 max-lg:w-full lg:mb-2"
          />
          <input
            type="number"
            placeholder="Quanity *"
            value={newVariant.qty}
            onChange={(e) => handleInputChange(e, "qty")}
            className="border p-2 mr-2 max-lg:w-full lg:mb-2"
          />
          <button
            onClick={addVariant}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Variant
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">SKU</th>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Color</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center uppercase">
                    {variant.sku}
                  </td>
                  <td className="border px-4 py-2 text-center uppercase">
                    {variant.size}
                  </td>
                  <td className="border px-4 py-2 text-center capitalize">
                    {variant.color}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {variant.price}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {variant.qty}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={(e) => deleteVariant(e, index)}
                      className="inline-block px-4 py-2 text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-indigo-700 md:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VariantsTable;
