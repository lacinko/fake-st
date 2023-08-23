function QuantitySelect() {
  return (
    <div>
      <div>
        <label
          htmlFor="select-1"
          className="mb-2 block text-sm font-medium dark:text-white"
        >
          Label
        </label>
        <div className="relative">
          <select
            id="select-1"
            className="block w-full rounded-md border-red-500 px-4 py-3 pr-16 text-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <option selected>Open this select menu</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
            <svg
              className="h-4 w-4 text-red-500"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-sm text-red-600">
          Please select a valid state.
        </p>
      </div>

      <div>
        <label
          for="select-2"
          className="mb-2 block text-sm font-medium dark:text-white"
        >
          Label
        </label>
        <div className="relative">
          <select
            id="select-2"
            className="block w-full rounded-md border-green-500 px-4 py-3 pr-16 text-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <option>Open this select menu</option>
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
            <svg
              className="h-4 w-4 text-green-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6091 3.41829C13.8594 3.68621 14 4.04952 14 4.42835C14 4.80718 13.8594 5.1705 13.6091 5.43841L6.93313 12.5817C6.68275 12.8495 6.3432 13 5.98916 13C5.63511 13 5.29556 12.8495 5.04518 12.5817L2.3748 9.72439C2.13159 9.45494 1.99701 9.09406 2.00005 8.71947C2.00309 8.34488 2.14351 7.98656 2.39107 7.72167C2.63862 7.45679 2.9735 7.30654 3.32359 7.30328C3.67367 7.30002 4.01094 7.44403 4.26276 7.70427L5.98916 9.55152L11.7211 3.41829C11.9715 3.15046 12.3111 3 12.6651 3C13.0191 3 13.3587 3.15046 13.6091 3.41829Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-sm text-green-600">Looks good!</p>
      </div>
    </div>
  )
}

export default QuantitySelect
