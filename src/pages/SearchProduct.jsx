import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import data from "../data.json";
import tinh_tp from "../tinh_tp.json";
import quan_huyen from "../quan_huyen.json";
import ColumnChart from "../components/ColumnChart";
const SearchProduct = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setselectedDistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [priceRange, setPriceRange] = useState();
  const [areaRange, setAreaRange] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const prices = [
    {
      id: 1,
      name: "Dưới 1 triệu",
      value: 1,
    },
    {
      id: 2,
      name: "1 triệu - 2 triệu",
      value: [1, 2],
    },
    {
      id: 3,
      name: "2 triệu - 3 triệu",
      value: [2, 3],
    },
    {
      id: 4,
      name: "3 triệu - 5 triệu",
      value: [3, 5],
    },
    {
      id: 5,
      name: "5 triệu - 7 triệu",
      value: [5, 7],
    },
    {
      id: 6,
      name: "7 triệu - 10 triệu",
      value: [7, 10],
    },
  ];
  const areas = [
    {
      id: 1,
      name: "Dưới 20",
      value: 20,
    },
    {
      id: 2,
      name: "20 - 30",
      value: [20, 30],
    },
    {
      id: 3,
      name: "30 - 50",
      value: [30, 50],
    },
    {
      id: 4,
      name: "50 - 60",
      value: [50, 60],
    },
    {
      id: 5,
      name: "60 - 70",
      value: [60, 70],
    },
    {
      id: 6,
      name: "70 - 80",
      value: [70, 80],
    },
  ];
  const handleSearch = () => {
    console.log(selectedCity, district, priceRange, areaRange);
    let filteredProducts = [...data];
    if (selectedCity) {
      filteredProducts = filteredProducts.filter(
        (product) => product.city === selectedCity
      );
      if (district) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.city === selectedCity && product.district === district
        );
      }
    }

    if (priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          parseFloat(product.price) >= parseFloat(priceRange[0]) * 1e6 &&
          parseFloat(product.price) <= parseFloat(priceRange[2]) * 1e6
      );
    }

    if (areaRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          parseFloat(product.area) >= parseFloat(areaRange[0] * 10) &&
          parseFloat(product.area) <= parseFloat(areaRange[3] * 10)
      );
    }

    setFilteredData(filteredProducts);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setselectedDistrict(event.target.value);
  };
  const handleDisChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
  };
  const handleAcreageChange = (event) => {
    setAreaRange(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <>
      <div className="container bg-warning p-4 bg-opacity-25 rounded w-100">
        <div className="row w-80">
          <div className="col-2">
            <label htmlFor="provinceSelect" className="form-label fw-semibold">
              Tỉnh/Thành phố:
            </label>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="form-select"
            >
              <option value="">Chọn thành phố</option>
              {Object.keys(tinh_tp).map((cityCode) => (
                <option key={cityCode} value={tinh_tp[cityCode].code}>
                  {tinh_tp[cityCode].name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <label htmlFor="districtSelect" className="form-label fw-semibold">
              Quận/Huyện:
            </label>
            <select
              value={district}
              onChange={handleDisChange}
              className="form-select"
            >
              <option value="">Chọn quận huyện</option>
              {Object.keys(quan_huyen).map((disCode) => {
                if (quan_huyen[disCode].parent_code === selectedDistrict) {
                  return (
                    <option key={disCode} value={quan_huyen[disCode].code}>
                      {quan_huyen[disCode].name_with_type}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="col-2">
            <label
              htmlFor="priceRangeSelect"
              className="form-label fw-semibold"
            >
              Khoảng giá:
            </label>
            <select
              value={priceRange}
              onChange={handlePriceChange}
              className="form-select"
            >
              <option value="">Chọn mức giá</option>
              {Object.keys(prices).map((price) => (
                <option key={price} value={prices[price].value}>
                  {prices[price].name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <label htmlFor="areaRangeSelect" className="form-label fw-semibold">
              Diện tích:
            </label>
            <select
              value={areaRange}
              onChange={handleAcreageChange}
              className="form-select"
            >
              <option value="">Chọn diện tích</option>
              {Object.keys(areas).map((dt) => (
                <option key={dt} value={areas[dt].value}>
                  {areas[dt].name} m<sup>2</sup>
                </option>
              ))}
            </select>
          </div>
          <div className="col-2 align-self-end">
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-warning fw-semibold text-white"
                onClick={handleSearch}
              >
                Lọc tin
              </button>
            </div>
          </div>
        </div>
      </div>
      {filteredData.length > 0 ? (
        filteredData.map((product) => {
          return (
            <ProductItem
              image={product.thumbnail}
              title={product.title}
              price={product.price}
              area={product.area}
              district={product.district}
              city={product.city}
              content={product.content}
              key={product.image}
            />
          );
        })
      ) : (
        <span>Không tìm thấy!</span>
      )}
    </>
  );
};

export default SearchProduct;
