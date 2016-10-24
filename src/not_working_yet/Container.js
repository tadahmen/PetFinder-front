import React from 'react';
import Map from './map';

export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: __AIzaSyC7YAekZlk5wu9wbtpstsINHf5gyQUiEIA__
})(Container)
