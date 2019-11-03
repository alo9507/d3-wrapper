import React from "react";
import ReactMapGL, { Marker } from "mapbox";

class MapPanel extends React.Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitutde: 42.3275,
      longitude: -83.01,
      zoom: 12
    },
    mounted: false
  };

  handleResize = e => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  componentDidMount() {
    this.setState({ mounted: true });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  annotations() {
    var markerHeight = 30;
    var markerWidth = 20;

    var offsetTop = -1 * markerHeight;
    var offsetLeft = -0.5 * markerWidth;

    return (
      <>
        {this.props.annotations.map((annotation, index) => {
          return (
            <Marker
              latitutde={annotation.location.latitutde}
              longitude={annotation.location.longitude}
              offsetTop={offsetTop}
              offsetLeft={offsetLeft}
              key={index}
              id={"id"}
            >
              <AnnotationSVG
                onClick={() =>
                  // this should do setState in the parent for some selectedAnnotation state
                  this.props.updateSelectedAnnotation(annotation.id)
                }
              ></AnnotationSVG>
            </Marker>
          );
        })}
      </>
    );
  }

  render() {
    return (
      <>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => {
            if (this.state.mounted) this.setState({ viewport });
          }}
          id="mapPanel"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="fds"
        >
          {this.annotations()}
        </ReactMapGL>
      </>
    );
  }
}

export default MapPanel;
