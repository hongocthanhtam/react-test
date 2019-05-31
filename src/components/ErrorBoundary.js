import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { hasError: false };
    this.state = { error: null, errorInfo: null };
  }

  // componentDidCatch() {
  //   // Display fallback UI
  //   this.setState({ hasError: true });
  // }
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  // render() {
  //   if (this.state.hasError) {
  //     // You can render any custom fallback UI
  //     return <h1>Some things wrong!</h1>;
  //   }
  //   return this.props.children;
  // }
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
