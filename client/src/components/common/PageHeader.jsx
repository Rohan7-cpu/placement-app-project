function PageHeader({ title, buttonText, onClick }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-500">
          Manage {title.toLowerCase()}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default PageHeader;