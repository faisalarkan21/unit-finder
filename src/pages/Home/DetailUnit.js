import { PushpinTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Space,
  Divider,
  Typography,
  Tag,
} from "antd";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { unitAct, detailUnitAct } from "../../actions/HomeAction";
import LayoutHome from "../../components/Layout";
import capitalize from "../../utils/capitalize";
var Carousel = require("react-responsive-carousel").Carousel;

const { Meta } = Card;
const { Option } = Select;
const { Title, Paragraph, Text } = Typography;
class Home extends React.Component {
  mapRef = React.createRef();

  componentDidMount() {
    const {
      history: {
        location: { state: id },
      },
    } = this.props;
    this.props.dispatch(detailUnitAct(id));
  }
  handleFetch(page = 1) {
    this.props.dispatch(
      unitAct({
        query: `?page=${page}&limit=4`,
        isPaging: true,
      })
    );
  }

  componentDidUpdate() {
    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize();
    }
  }

  handlePageChange = (page) => {
    this.handleFetch(page);
  };

  handleClickMarker = (id) => {
    this.props.history.push({
      pathname: "/detail",
      state: id,
    });
  };

  render() {
    const {
      detailUnit: {
        id,
        createdAt,
        description,
        facilities,
        type,
        images: { primary, other },
        address: { street, city, country, longitude, latitude },
        name,
      },
    } = this.props;

    return (
      <LayoutHome>
        <Row gutter={[5, 32]} className="container" type="flex">
          <Col span={14}>
            <Row>
              <Card bordered={false}>
                <Meta
                  title={
                    <>
                      <div className="float-left">
                        <Title level={2}>{`${capitalize(type)} ${name}`}</Title>
                      </div>
                    </>
                  }
                  description={
                    <Space size={"middle"} direction="vertical">
                      <Text strong>Description</Text>
                      <div className="description">{description}</div>
                      <div className="float-left furniture-style">
                        {/* <Space size={"small"} direction="horizontal"> */}
                        {facilities.map((x) => (
                          <Tag color="blue">{x}</Tag>
                        ))}

                        {/* </Space> */}
                      </div>
                    </Space>
                  }
                />
              </Card>
            </Row>
            <Row>
              <Card
                bordered={false}
                // size="small"
                // className="card-map-detail"
              >
                <Meta
                  description={
                    <Space size={"middle"} direction="vertical">
                      <Text strong>Images</Text>
                      <Carousel showArrows={true}>
                        {other.map((v) => {
                          return (
                            <div className="container-carousel">
                              <img src={v} />
                              {/* <p className="legend">Legend 1</p> */}
                            </div>
                          );
                        })}
                      </Carousel>
                    </Space>
                  }
                />
              </Card>
            </Row>
          </Col>
          <Col span={10}>
            <Card
              bordered={false}
              // size="small"
              className="card-map-detail"
              // title="Location"
            >
              <div className="title-map-detail">
                <Text strong>Location</Text>
                <Paragraph>{`${city}, ${street} ${country}`}</Paragraph>
              </div>
              <Map
                className="leaflet-detail-container"
                ref={this.mapRef}
                center={[latitude, longitude]}
                zoom={15}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                 <Marker
                      onMouseOver={(e) => {
                        e.target.openPopup();
                      }}
                      onMouseOut={(e) => {
                        e.target.closePopup();
                      }}
                      onclick={() => this.handleClickMarker(id)}
                      position={[latitude, longitude]}
                    >
                      <Popup>
                        <div>{`${capitalize(type)} ${name}`}</div>
                        <div>{`${city}, ${street} ${country}`}</div>
                      </Popup>
                    </Marker>
              </Map>
            </Card>
          </Col>
        </Row>
      </LayoutHome>
    );
  }
}

function mapStateToProps(state) {
  return {
    detailUnit: state.getUnit.detailUnit,
  };
}

export default connect(mapStateToProps)(Home);
