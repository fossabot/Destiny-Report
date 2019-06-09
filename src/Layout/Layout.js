import { Header, Footer, Modal, Loading } from "../components";
import "../../static/styles/Layout.scss";
import { connect } from "react-redux";

const Layout = ({ children, global }) => {
  return (
    <div className="layout">
      <Header />
      <Modal active={global.error} />
      <div className="main--wrapper">
        <main className="main--content">
          {global.showLoader ? <Loading /> : children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default connect(state => ({ global: state.global }))(Layout);
