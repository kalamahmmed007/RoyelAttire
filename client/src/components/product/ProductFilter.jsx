import { useState } from "react";

const ProductFilter = ({ categories, onFilter }) => {
    const [selected, setSelected] = useState("");

    const handleChange = (e) => {
        setSelected(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <div className="mb-6">
            <select
                value={selected}
                onChange={handleChange}
                className="rounded border p-2"
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductFilter;
