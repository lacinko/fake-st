import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { ItemCardObject } from "../types/types";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import ExpandedFilter from "../components/ExpandedFilter";
import FilterList from "../components/FilterList";

function ShoppingPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownOptions = [
    "Cheapest",
    "Most expensive",
    "Most popular",
    "Newest",
  ];

  const [selectedSortingOption, setSelectedSortingOption] =
    useState("Cheapest");
  async function getProducts(category: string) {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = await response.json();
    const dataWithDates = data.map((item: ItemCardObject) => {
      const currentDate = new Date();
      const randomDate = new Date(
        currentDate.getTime() - Math.random() * 10000000000
      );
      return { ...item, createdAt: randomDate };
    });
    return dataWithDates;
  }
  useEffect(() => {
    (async () => {
      const products = await getProducts(category as string);
      setProducts(products);
    })();
  }, [category]);

  const filteredProducts = products.filter((product: ItemCardObject) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /*
  const uniqueCategories = [
    ...new Set(products.map((product: ItemCardObject) => product.category)),
  ];
  */

  filteredProducts.sort((a: ItemCardObject, b: ItemCardObject) => {
    if (selectedSortingOption === "Cheapest") {
      return a.price - b.price;
    } else if (selectedSortingOption === "Most expensive") {
      return b.price - a.price;
    } else if (selectedSortingOption === "Most popular") {
      return b.rating.rate - a.rating.rate;
    } else if (selectedSortingOption === "Newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0; // this is just to make the linter happy
  });

  const minValue = Math.min(
    ...filteredProducts.map((product: ItemCardObject) => product.price)
  );

  const maxValue = Math.max(
    ...filteredProducts.map((product: ItemCardObject) => product.price)
  );

  return (
    <div className="container my-4 text-sm">
      <SearchBar
        placeholder={`Search for ${category}`}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <div className="flex items-center gap-2">
        <Dropdown
          options={dropdownOptions}
          selectValue={setSelectedSortingOption}
          defaultOption={selectedSortingOption}
        />
        <Modal buttonText="Filtering options">
          {isExpanded ? (
            <ExpandedFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              sliderMin={minValue}
              sliderMax={maxValue}
            />
          ) : (
            <FilterList
              setSelectedFilter={setSelectedFilter}
              setIsExpanded={setIsExpanded}
              isExpanded={isExpanded}
            />
          )}
        </Modal>
      </div>
      <div className="mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product: ItemCardObject) => (
          <ItemCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ShoppingPage;
