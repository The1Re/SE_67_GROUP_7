function Input({ label, placeholder, type = "text", value = "", onChange }) {
    return ( 
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="border px-4 py-2 w-full rounded-lg" />
        </div>
    )
}

export default Input;