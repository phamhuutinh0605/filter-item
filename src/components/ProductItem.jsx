import { Container, Row, Col } from "react-bootstrap";
import { formatMoney } from "../formatPrice";
import tinh_tp from "../tinh_tp.json";
import quan_huyen from "../quan_huyen.json";

const ProductItem = ({
  image,
  title,
  price,
  area,
  district,
  city,
  content,
}) => {
  function getCityNameByCode(cityCode) {
    const cityInfo = tinh_tp[cityCode];
    if (cityInfo) {
      return cityInfo.name;
    } else {
      return "Không tìm thấy";
    }
  }
  function getDistrictNameByCode(disCode) {
    const disInfo = quan_huyen[disCode];
    if (disInfo) {
      return disInfo.name_with_type;
    } else {
      return "Không tìm thấy";
    }
  }
  return (
    <div className="product-item w-75 mx-auto mt-3 border border-danger">
      <Container className="p-3 d-flex justify-content-start">
        <Row>
          <Col
            xs={12}
            md={4}
            className="text-center d-flex justify-content-center"
          >
            <img src={image} alt={title} className="product-image w-100" />
          </Col>
          <Col xs={12} md={8} className="text-start">
            <h3 className="text-danger text-uppercase">{title}</h3>
            <h5 className="text-success">{formatMoney(price)}/tháng</h5>
            <div className="d-flex">
              <p className="">
                Diện tích:
                <span className="fw-semibold m-1">
                  {area}m<sup>2</sup>
                </span>
              </p>
              <span className="ms-3">
                Khu vực:
                <strong className="text-primary ">
                  {getDistrictNameByCode(district)}, {getCityNameByCode(city)}
                </strong>
              </span>
            </div>
            <p>{content}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductItem;
