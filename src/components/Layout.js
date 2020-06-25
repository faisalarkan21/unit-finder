import { AutoComplete, Layout, Input } from "antd";
import React from "react";
import { connect } from "react-redux";
import { unitAct } from "../actions/HomeAction";
import capitalize from "../utils/capitalize";

const { Header, Content } = Layout;

const renderTitle = (title) => <span>{title}</span>;

const renderItem = (title, id) => ({
  value: title,
  id,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
    </div>
  ),
});

class LayoutHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestInput: [],
      searchText: "",
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = (query) => {
    /**
     * https://www.mockapi.io/docs
     * SEARCHING with query must be case sensitive
     */
    this.props.dispatch(
      unitAct({
        query: `?${query ? `&search=${capitalize(query)}` : ""}`,
        isPaging: false,
      })
    );
  };

  static getDerivedStateFromProps(props, state) {
    const { unitNonPaging } = props;
    const optionsSuggest = [];

    if (unitNonPaging.length <= 0) {
      return;
    }

    const tempAppartement = unitNonPaging.filter(
      ({ type }) => type === "apartement"
    );
    const tempOffice = unitNonPaging.filter(({ type }) => type === "office");

    if (tempAppartement.length > 0) {
      optionsSuggest.push({
        label: renderTitle("Appartement"),
        options: tempAppartement.map(({ name, id }) => renderItem(name, id)),
      });
    }

    if (tempOffice.length > 0) {
      optionsSuggest.push({
        label: renderTitle("Office"),
        options: tempOffice.map(({ name, id }) => renderItem(name, id)),
      });
    }

    return {
      suggestInput: optionsSuggest,
    };
  }

  onSearch = (searchText) => {
    this.setState(
      {
        searchText,
      },
      () => {
        this.handleFetch(this.state.searchText);
      }
    );
  };

  onSelect = (value, { id }) => {
    this.props.history.push({
      pathname: "/detail",
      state: id,
    });
  };

  render() {
    const { children, isNeedHeader } = this.props;
    const { suggestInput } = this.state;
    return (
      <Layout>
        {isNeedHeader &&
        <Header
          style={{
            position: "fixed",
            display: "flex",
            zIndex: 999,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AutoComplete
            options={suggestInput}
            style={{ width: 400 }}
            onSelect={this.onSelect}
            onSearch={this.onSearch}
          >
            <Input.Search
              size="middle"
              placeholder="Appartement / Office"
              enterButton
            />
          </AutoComplete>
        </Header>
        
        }
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: (isNeedHeader ? 80 : 0) }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    unitNonPaging: state.getUnit.unitNonPaging,
  };
}

export default connect(mapStateToProps)(LayoutHome);
