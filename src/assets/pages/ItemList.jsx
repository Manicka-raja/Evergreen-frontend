import { useState } from "react";
import { getmenu } from "../../ApiFeature";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Component/Loader";

const ChevronDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const PriceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
    />
  </svg>
);

const CustomSelect = ({ value, onChange, options, colorTheme, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    options.find((opt) => String(opt.value) === String(value))?.label ||
    "Select";

  const themes = {
    rose: {
      btn: "border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 ring-rose-400",
      icon: "text-rose-600",
      itemActive: "bg-rose-50 text-rose-700",
      itemHover: "hover:bg-rose-50 hover:text-rose-700",
    },
    indigo: {
      btn: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100 ring-indigo-400",
      icon: "text-indigo-600",
      itemActive: "bg-indigo-50 text-indigo-700",
      itemHover: "hover:bg-indigo-50 hover:text-indigo-700",
    },
    teal: {
      btn: "border-teal-200 bg-teal-50 text-teal-700 hover:border-teal-300 hover:bg-teal-100 ring-teal-400",
      icon: "text-teal-600",
      itemActive: "bg-teal-50 text-teal-700",
      itemHover: "hover:bg-teal-50 hover:text-teal-700",
    },
  };
  const theme = themes[colorTheme] || themes.indigo;

  return (
    <div className="relative min-w-[200px]">
      {isOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-12 w-full items-center justify-between rounded-full border px-4 py-2 text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          theme.btn
        } ${isOpen ? "ring-2 ring-offset-1" : ""}`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon />}

          <span>{selectedLabel}</span>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
          <ul className="max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  String(value) === String(option.value)
                    ? theme.itemActive
                    : `text-slate-600 ${theme.itemHover}`
                }`}
              >
                {option.label}
                {String(value) === String(option.value) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

function ItemList() {
  const { category } = useParams();
  const [price, setPrice] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const navigate = useNavigate();
  const { data: menu = [], isLoading } = useQuery({
    queryKey: ["tours", price, sort, page, limit],
    queryFn: () => getmenu({ category, price, sort, page, limit }),
  });

  if (isLoading) return <Loader />;

  const itemsToDisplay = category
    ? menu?.filter((item) => item.category === category)
    : menu;

  const priceOptions = [
    { label: "Over $300", value: 300 },
    { label: "Over $500", value: 500 },
  ];
  const sortOptions = [
    { label: "Price: High → Low", value: "price" },
    { label: "Price: Low → High", value: "-price" },
    { label: "Newest First", value: "-createdAt" },
    { label: "Oldest First", value: "createdAt" },
  ];
  const limitOptions = [
    { label: "Show 5", value: 5 },
    { label: "Show 10", value: 10 },
    { label: "Show 15", value: 15 },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 md:px-8">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            {category ? `${category} Collection` : "Explore Collection"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {category
              ? `Viewing results for ${category}`
              : "Find the perfect items tailored for you."}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CustomSelect
            value={price}
            onChange={setPrice}
            options={priceOptions}
            icon={PriceIcon}
            colorTheme="rose"
          />
          <CustomSelect
            value={sort}
            onChange={setSort}
            options={sortOptions}
            icon={SortIcon}
            colorTheme="indigo"
          />
          <CustomSelect
            value={limit}
            onChange={setLimit}
            options={limitOptions}
            icon={FilterIcon}
            colorTheme="teal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {itemsToDisplay?.length > 0 ? (
          itemsToDisplay.map((item) => (
            <div
              key={item._id || item.id || Math.random()}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => navigate(`/item/${item._id}`)}
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={`https://evergreen-home-products.onrender.com/img/products/${item.image}`}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300?text=Product")
                  }
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                  ${item.price}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600">
                    {item.name}
                  </h2>
                  <p className="line-clamp-2 text-sm text-slate-500">
                    {item.description ||
                      "Experience the best quality with our premium collection items."}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase text-slate-400">
                      Total Price
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      ${item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-1.5 border border-slate-100">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition-colors hover:bg-rose-50 hover:text-rose-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </button>
                    <span className="min-w-[1rem] text-center text-sm font-bold text-slate-700">
                      0
                    </span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm transition-transform hover:scale-105 hover:bg-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-slate-500">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-center gap-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition-all hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Previous
        </button>

        <button
          onClick={() => setPage((old) => old + 1)}
          className="group flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ItemList;
