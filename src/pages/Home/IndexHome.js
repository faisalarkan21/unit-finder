import { PushpinTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Divider, Pagination, Row, Select, Space, Typography } from "antd";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import { unitAct } from "../../actions/HomeAction";
import LayoutHome from "../../components/Layout";
import capitalize from "../../utils/capitalize";

const { Meta } = Card;
const { Option } = Select;
const { Paragraph } = Typography;

class Home extends React.Component {
  mapRef = React.createRef();

  componentDidMount() {
    this.handleFetch();
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

  handleRenderCard = () => {
    const { unitProperty } = this.props;
    const componentCard = [];
    unitProperty.forEach((v) => {
      componentCard.push(
        <Col flex={2} className="card" col={6}>
          <Card
            style={{ width: 255 }}
            cover={
              <img className="img-card" alt="example" src={v.images.primary} />
            }
            actions={[
              <Button
                onClick={() => this.handleClickMarker(v.id)}
                type="primary"
                className="btn-card"
              >
                Detail
              </Button>,
            ]}
          >
            <Meta
              title={
                <>
                  <div className="float-left">{v.name}</div>
                </>
              }
              description={
                <Space size={"middle"} direction="vertical">
                  <div className="description">

                  <Paragraph ellipsis={{ rows: 3 }}>
                      {v.description}
                      </Paragraph>
                    {/* {truncate(v.description, 50)} */}
                  </div>
                  <div className="float-left furniture-style">
                    <Space size={"small"} direction="horizontal">
                      <PushpinTwoTone />

                      {`${v.address.city}, ${v.address.street}`}
                    </Space>
                  </div>
                </Space>
              }
            />
          </Card>
        </Col>
      );
    });
    return componentCard;
  };

  render() {
    const { unitProperty, unitNonPaging, totalUnit, history } = this.props;
    const position = [51.505, -0.09];
    return (
      <LayoutHome isNeedHeader history={history}>
        <Row className="container" type="flex">
          <Col span={12} >
            <Row gutter={[15, 32]}>{this.handleRenderCard()}</Row>
            <Divider type="horizontal" />
            <Row justify="center">
              <Pagination
                onChange={this.handlePageChange}
                simple
                pageSize={4}
                total={totalUnit}
              />
            </Row>
          </Col>
          <Col span={12} >
            <Map
              ref={this.mapRef}
              center={[-6.2154923, 106.8498936]}
              zoom={10.2}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {unitProperty.map(
                ({
                  id,
                  type,
                  name,
                  address: { latitude, longitude, street, city, country },
                }) => {
                  return (
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
                  );
                }
              )}
            </Map>
          </Col>
        </Row>
      </LayoutHome>
    );
  }
}

function mapStateToProps(state) {
  return {
    unitProperty: state.getUnit.unit,
    unitNonPaging: state.getUnit.unitNonPaging,
    totalUnit: state.getUnit.totalUnit,
  };
}

export default connect(mapStateToProps)(Home);
