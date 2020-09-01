/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from "react";
import PropTypes from "prop-types";
import styles from "./IframePreview.css";
import axios from "axios";

const assembleProjectUrl = ({ displayed, options }) => {
  const { slug } = displayed;
  const { previewURL, page } = options;
  if (!page || !previewURL) {
    console.warn("Missing slug or previewURL", { slug, previewURL });
    return "";
  }
  return `${previewURL}/${page}`;
};

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    document: null,
  };

  state = {
    isLoading: true,
    url: "",
    error: false,
  };

  componentDidMount() {
    axios
      .post(
        "https://yskeo5mgc0.execute-api.us-west-2.amazonaws.com/dev/startSandbox",
        {
          sanity: {
            id: "7vfuzohq",
            token: "skyh5gYmGWWJWky6ry2w46u68xcPcUxi6IcN8aFW8IuGNipkAcqI3Fi0p8i0jKJzx55v2Iaq641pu7uzVltquCK8GKTuFwrmC60arpeQgt6F3aZMZeLti9SJt1UdcVWhRK38FJZS2eul5gnPVphUdE1HntagTr7m6kQZha7hGHPH38au2Umw",
          },
        }
      }
    ).then( (response) => {
      console.log('response', response);
      this.setState({
        isLoading: false,
        url: response.data.url,
        error: false
      });
    }).catch( (e) => {
      console.log('e', e);
      this.setState({
        isLoading: false,
        url: '',
        error: e
      });
  }

  render() {
    // const {options} = this.props
    // const {displayed} = this.props.document
    // console.log('displayed', displayed);
    // if (!displayed) {
    //   return (<div className={styles.componentWrapper}>
    //     <p>There is no document to preview</p>
    //   </div>)
    // }

    // const url = assembleProjectUrl({displayed, options})

    // if (!url) {
    //   return (<div className={styles.componentWrapper}>
    //     <p>Hmm. Having problems constructing the web front-end URL.</p>
    //   </div>)
    // }

    const { isLoading, url, error } = this.state;

    if (error) {
      return <div>Error</div>;
    }

    console.log("error", error);
    console.log("url", url);
    console.log("isLoading", isLoading);
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={styles.componentWrapper}>
          <div className={styles.iframeContainer}>
            <iframe src={url} frameBorder={"0"} />
          </div>
        </div>
      );
    }
  }
}

export default IframePreview;
